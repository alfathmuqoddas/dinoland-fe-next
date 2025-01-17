"use server";

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
