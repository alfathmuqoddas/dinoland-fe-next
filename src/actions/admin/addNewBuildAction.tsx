"use server";

export default async function addNewBuildAction(
  prevState: any,
  formData: FormData
) {
  const data = {
    name: formData.get("buildName"),
    description: formData.get("buildDescription"),
  };

  const response = await fetch("http://localhost:8080/api/my-build", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    return { success: false, message: result.error };
  }

  return { success: true, message: "Build added successfully" };
}
