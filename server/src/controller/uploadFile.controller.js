export const uploadFileController = async (req, res) => {
  try {
    const { folder_name, user_id, company_name } = req.body;
    const file = req.file;

    if (!file) return errorResponse(res, "File not found!", 400);

    if (!user_id) return errorResponse(res, "Candidate ID is required", 400);

    const fileData = fs.readFileSync(file.path);

    const cleanName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    const fileName = `${folder_name}/${Date.now()}-${company_name}-${cleanName}`;

    const { error } = await supabase.storage
      .from("documents")
      .upload(fileName, fileData, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("documents")
      .getPublicUrl(fileName);

    fs.unlinkSync(file.path);

    const readyData = {
      user_id,
      file_name: folder_name,
      doc_url: publicUrlData.publicUrl,
    };

    // ← upsert instead of insert
    const { error: dbError } = await supabase
      .from("agreements_docs")
      .upsert(readyData, {
        onConflict: "user_id, file_name",
      });

    if (dbError) {
      await supabase.storage.from("documents").remove([fileName]);
      return errorResponse(res, "DB insert failed", 500, dbError.message);
    }

    return successResponse(
      res,
      "Upload successfully",
      publicUrlData.publicUrl,
      200,
    );
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Upload failed", 500, err.message);
  }
};
