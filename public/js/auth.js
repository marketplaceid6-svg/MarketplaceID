async function getMe() {

  try {

    const res =
      await fetch(
        "/api/me"
      );

    const data =
      await res.json();

    if (
      !data.success
    ) {

      return null;

    }

    return data.user;

  } catch {

    return null;

  }
}

async function logout() {

  await fetch(
    "/api/logout",
    {
      method: "POST"
    }
  );

  window.location.href =
    "/login";
}
