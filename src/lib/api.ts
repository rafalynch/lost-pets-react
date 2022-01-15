const API_BASE_URL = "https://apx-pets.herokuapp.com";
//const API_BASE_URL = "http://localhost:3003";

export async function fetchMascotasCercanas(currentLocation) {
  const res = await fetch(
    API_BASE_URL +
      "/pets-cerca-de?lat=" +
      currentLocation.lat +
      "&lng=" +
      currentLocation.lng
  );
  const data = await res.json();
  return data;
}

export async function fetchPetById(id) {
  const res = await fetch(API_BASE_URL + "/pets/" + parseInt(id));
  const petHit = await res.json();
  return petHit;
}

export async function isExistingEmail(email) {
  const res = await fetch(API_BASE_URL + "/auth/" + email);
  const data = await res.json();
  return data;
}

export async function fetchLogin(email, password) {
  const res = await fetch(API_BASE_URL + "/auth/token", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.status == 200) {
    const data = await res.json();
    return data.token;
  } else {
    return false;
  }
}

export async function fetchSignup(email, name, password) {
  const res = await fetch(API_BASE_URL + "/auth", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      fullName: name,
    }),
  });

  if (res.status == 200) {
    return true;
  } else {
    return false;
  }
}

export async function fetchUpdateUser(email, name, password) {
  const res = await fetch(API_BASE_URL + "/auth", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      fullName: name,
    }),
  });

  if (res.status == 200) {
    return res;
  } else {
    return false;
  }
}

export async function fetchUserData(token) {
  const res = await fetch(API_BASE_URL + "/me", {
    headers: {
      Authorization: "bearer " + token,
    },
  });
  const user = await res.json();
  return user;
}

export async function fetchMisMascotas(token: string) {
  const res = await fetch(API_BASE_URL + "/me/pets", {
    headers: {
      Authorization: "bearer " + token,
    },
  });
  const mascotas = await res.json();
  return mascotas;
}

interface Pet {
  name: string;
  lat;
  lng;
  imageUrl: string;
}

export async function postNuevaMascota(petData: Pet, token: string) {
  const res = await fetch(API_BASE_URL + "/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
    body: JSON.stringify(petData),
  });
  return res;
}

export async function fetchMiMascotaById(petId, token: string) {
  const res = await fetch(API_BASE_URL + "/me/pets/" + petId, {
    headers: {
      Authorization: "bearer " + token,
    },
  });
  const mascota = await res.json();
  return mascota;
}

export async function updateMascota(updateData, petId, token: string) {
  const res = await fetch(API_BASE_URL + "/pets/" + petId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
    body: JSON.stringify(updateData),
  });
  return res;
}

export async function fetchDeleteMascota(petId, token: string) {
  const res = await fetch(API_BASE_URL + "/pets/" + petId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
  });
  return res;
}

interface Report {
  name: string;
  phoneNumber: string;
  description: string;
  petId: string;
  contact: string;
}

export async function postNewReport(reportData: Report) {
  const res = await fetch(API_BASE_URL + "/report", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reportData),
  });
  const data = await res.json();
  return data;
}
