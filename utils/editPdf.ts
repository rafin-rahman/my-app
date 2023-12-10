export async function editPdf(formData: any) {
  try {
    const response = await fetch("/api/modifyPdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
  } catch (error) {
    console.log("Error modifying PDF", error);
  }
}
