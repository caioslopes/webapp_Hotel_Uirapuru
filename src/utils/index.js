const baseUrl = "http://localhost:8080/hotel";

async function request(method, endpoint) {
  const options = {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    /* body: JSON.stringify(body), */
  };
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  const data = await response.json();
  return data;
}

function changeBackground(){
  let body = document.querySelector('body');
  body.style.background = "";
  const url = window.location.href;
  console.log(url);
}

export { request, changeBackground };
