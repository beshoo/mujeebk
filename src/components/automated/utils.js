import axios from "axios";
const baseUrl = "https://mujeebk.com/api/";
const checkApiUrl = baseUrl + "web_api.php";
const saveApiUrl = baseUrl + "save/";

export const generateId = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export const deepClone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

export const saveToLocalStorage = function(chainObject, storage) {
  if (chainObject) {
    localStorage.setItem(storage, JSON.stringify(chainObject));
  }
};

export const loadFromLocalStorage = function(storage) {
  if (
    localStorage.getItem(storage) &&
    localStorage.getItem(storage).length > 0
  ) {
    return JSON.parse(localStorage.getItem(storage));
  }
  return null;
};

export const sleep = function(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const postDataToServer = function(dialogData) {
  // post to the server
  // response must be an object like
  /* 
      {
        success:true,// true or false
        error:"",// error message if exists
        url:"", // url to the file or the url set by user
      }
  */
  let formData = new FormData();
  formData.append("router", 'validate_dialog');
  formData.append("session_id", localStorage.getItem('session_id'));// sorry :(
  formData.append("dialogId", dialogData.dialogId);
  formData.append("option", JSON.stringify(dialogData.option));
  formData.append("message", dialogData.inputs.message);
  if (dialogData.inputs.url) {
    formData.append("url", dialogData.inputs.url);
  }
  if (dialogData.inputs.file) {
    formData.append(
      "file",
      dialogData.inputs.file,
      dialogData.inputs.file.name
    );
  }

  return axios
    .post(checkApiUrl, formData)
    .then((response) => {
      return response.data;
    })
    .catch((er) => {
      return { success: false, error: er, url: null };
    });
};

export const postSavedDataToServer = function(chain, deletedUrls) {
  // post to the server
  // response must be an object like
  /* 
      {
        success:true,// true or false
        error:"",// error message if exists
      }
  */
  const payload = { chain: chain, deletedUrls: deletedUrls };
  let saveFormData = new FormData();
  saveFormData.append("router", 'save_dialog');
  saveFormData.append("session_id", localStorage.getItem('session_id'));
  saveFormData.append("number_id", 1);//for test
  saveFormData.append("chain", JSON.stringify(payload) ); // Convert object to a JSON string
  return axios
    .post(saveApiUrl, saveFormData) 
    .then((response) => {
      return response.data;
    })
    .catch((er) => {
      return { success: false, error: er };
    });
    
};
