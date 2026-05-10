import fs from "fs";
import { supabase, supabaseAdmin } from "../config/supabase.js";
import { errorResponse, successResponse } from "../util/response.js";

const uploadToStorage = async (file, folder, companyName) => {
  const fileData = fs.readFileSync(file.path);
  const cleanName = file.originalname
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");
  const storagePath = `${folder}/${Date.now()}-${companyName}-${cleanName}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(storagePath, fileData, { contentType: file.mimetype, upsert: true });

  if (error) throw error;

  fs.unlinkSync(file.path);

  const { data } = supabase.storage.from("documents").getPublicUrl(storagePath);
  return { url: data.publicUrl, storagePath };
};

export const uploadAgreementController = async (req, res) => {
  const { user_id, company_name, authority_name, service_charge } = req.body;
  const signatureFile = req.files?.signature?.[0];
  const stampFile = req.files?.stamp?.[0];

  if (!signatureFile) return errorResponse(res, "Signature file is required", 400);
  if (!stampFile) return errorResponse(res, "Stamp file is required", 400);
  if (!user_id) return errorResponse(res, "User ID is required", 400);
  if (!authority_name) return errorResponse(res, "Authority name is required", 400);

  const uploadedPaths = [];

  try {
    const sig = await uploadToStorage(signatureFile, "signatures", company_name);
    uploadedPaths.push(sig.storagePath);

    const stamp = await uploadToStorage(stampFile, "stamps", company_name);
    uploadedPaths.push(stamp.storagePath);

    const { error: dbError } = await supabaseAdmin
      .from("agreements")
      .upsert(
        {
          user_id,
          file_name: company_name,
          folder_name: "agreements",
          signature_url: sig.url,
          stamp_url: stamp.url,
          authority_name,
          service_charge: parseFloat(service_charge),
        },
        { onConflict: "user_id, file_name" },
      );

    if (dbError) {
      await supabase.storage.from("documents").remove(uploadedPaths);
      return errorResponse(res, "DB insert failed", 500, dbError.message);
    }

    return successResponse(
      res,
      "Agreement uploaded successfully",
      { signature_url: sig.url, stamp_url: stamp.url },
      200,
    );
  } catch (err) {
    if (uploadedPaths.length > 0) {
      await supabase.storage.from("documents").remove(uploadedPaths);
    }
    [signatureFile, stampFile].forEach((f) => {
      if (f?.path && fs.existsSync(f.path)) fs.unlinkSync(f.path);
    });
    console.error(err);
    return errorResponse(res, "Upload failed", 500, err.message);
  }
};
