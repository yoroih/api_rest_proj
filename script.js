(() => {
  const xhr = new XMLHttpRequest();
  const $xhr = document.getElementById("xhr");
  const $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", e => {
    if(xhr.readyState !== 4) return;

    if(xhr.status >= 200 && xhr.status < 300){
      let json = JSON.parse(xhr.responseText);
      
      json.forEach( el => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} | ${el.email} | ${el.phone}`
        $fragment.appendChild($li)
      });

      $xhr.appendChild($fragment)
    } else {
      let message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `Error ${xhr.status}:${message}`;
    }

    console.log("Este mensaje cargará de cualquier forma")

  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  
  //Solicitud local
  // xhr.open("GET", "users.json");

  xhr.send();
})();

(() => {
  const $fetch = document.getElementById("fetch");
  const $fragment = document.createDocumentFragment();
  //también podría funcionar localmente users.json
  fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) =>res.ok ? res.json() : Promise.reject(res))
  .then(json => {
    console.log(json);
    json.forEach(el => {
      const $li = document.createElement("li");
      $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
      $fragment.appendChild($li);
    });
    $fetch.appendChild($fragment);
  })
  .catch(err => {
    console.log(`Error: ${err.status}`);
    let message = err.statusText || "Ocurrió un error";
    $fetch.innerHTML = `Error ${err.status}: ${message}`
  })
  .finally(() => console.log("Esto se ejecutará si o si"));
})();

(()=>{
  const $fetchAsync = document.getElementById("fetch-async");
  const $fragment = document.createDocumentFragment();

  async function getData(){
    try{
      let res = await fetch("https://jsonplaceholder.typicode.com/users");
      let json = await res.json();

      if(!res.ok) throw {status: res.status, statusText: res.statusText};

      json.forEach(el => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
        $fragment.appendChild($li);
      });

      $fetchAsync.appendChild($fragment);
    
    }catch(err){
      let message = err.statusText || "Ocurrió un error";
      $fetchAsync.innerHTML = `Error ${err.status}: ${message}`
    }finally{
      console.log("Esto se ejecuta independientemente del try-catch")
    }
  }

  getData();
})();

(() => {
  const $axios = document.getElementById("axios");
  const $fragment = document.createDocumentFragment();

  axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then(res => {
    let json = res.data;
    json.forEach(el => {
      const $li = document.createElement("li");
      $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
      $fragment.appendChild($li);
    });

    $axios.appendChild($fragment);
  })
  .catch(err => {
    let message = err.response.statusText || "Ocurrió un error";
    $axios.innerHTML = `Error: ${err.response.status}: ${message}`
  })
  .finally(()=>{
    console.log("Esto se ejecuta indendientemente del resultado de Axios")
  });
})();

(() => {
  const $axiosAsync = document.getElementById("axios-async");
  const $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users");
      let json = await res.data;

      json.forEach(el => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
        $fragment.appendChild($li);
      });

      $axiosAsync.appendChild($fragment);
    } catch(err) {
        let message = err.response.statusText || "Ocurrió un error";
        $axiosAsync.innerHTML = `Error: ${err.response.status}: ${message}`
    } finally {
        console.log("Esto se ejecuta indendientemente del resultado del try catch en Axios")
    }
  }

  getData();
})();
