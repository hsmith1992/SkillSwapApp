import { API } from "@/config";

export const getProfile = (user, token) => {
  return fetch(`${API}/user/${user._id}`, {
    headers: { Authorization: `bearer ${token}` }
  })
    .then(res => res.json())
    .catch(error => console.log(`Unable to load profile: ${error}`));
}

export const readSkill = (id) => {
  return fetch(`${API}/skill/${id}`)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export const getSkills = () => {

  return fetch(`${API}/skills`)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};

export const addSkill = (user, token, skill, level) => {
  console.log(token)
  return fetch(`${API}/user/skills/${user}/${skill}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ "level": level })
  })
}

export const removeSkill = (user, token, skill) => {
  return fetch(`${API}/user/skills/${user}/${skill}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => console.log("Skill Removed")).catch(err => console.log("Unable to remove skill:", err));
}