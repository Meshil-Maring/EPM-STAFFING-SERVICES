import React, { useState } from "react";
import Image from "./Image";

/**
 * Test component to demonstrate offline image placeholder functionality
 */
function ImageTest() {
  const [simulateOffline, setSimulateOffline] = useState(false);

  // Test images
  const testImages = [
    {
      src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300&fit=crop",
      alt: "Test image 1",
      label: "Working image",
    },
    {
      src: "https://nonexistent-domain-12345.com/image.jpg",
      alt: "Test image 2",
      label: "Broken image URL",
    },
    {
      src: "",
      alt: "Test image 3",
      label: "Empty image URL",
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-2xl font-bold">Image Offline Test</h2>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={simulateOffline}
              onChange={(e) => setSimulateOffline(e.target.checked)}
              className="form-checkbox"
            />
            <span>Simulate Offline Mode</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testImages.map((image, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2">{image.label}</h3>
            <div className="aspect-square bg-gray-100 rounded">
              <Image
                link={image.src}
                alt={image.alt}
                class_name="w-full h-full object-cover rounded"
                width={400}
                height={300}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              URL: {image.src || "Empty"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>
            When online and image loads successfully: Shows the actual image
          </li>
          <li>When offline: Shows lightweight SVG placeholder</li>
          <li>When image fails to load: Shows lightweight SVG placeholder</li>
          <li>When no image URL provided: Shows lightweight SVG placeholder</li>
          <li>Loading state shows a spinner until image loads</li>
        </ul>
      </div>
    </div>
  );
}

export default ImageTest;
