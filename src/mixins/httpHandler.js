import axios from "axios";
export default {
  data() {
    return {
      base_url: "https://mujeebk.com/api/web_api.php"
    };
  },
  methods: {
    async post(parameters, checkSession) {
      /* eslint-disable */
        var bodyFormData = new FormData();
          try {
            if (localStorage.getItem("session") != "undefined") {
              bodyFormData.append("session_id", localStorage.getItem("session_id"));
            }
            Object.keys(parameters).forEach(function(key) {
              bodyFormData.append(key, parameters[key]);
            });
              const respone = await axios.post(this.base_url, bodyFormData, checkSession)
              .then( async (response) => {
                
                if (checkSession) {
                  if (
                    response.data.session == false
                  ) {
                    this.$router.push('/login')
                    this.error = true
                  } else {
                    if(response.data.session == true)
                    {
                      localStorage.setItem('session_id', response.data.session_id)
                    }
     
                  }
                } else {
                  if(response.data.session)
                  {
                    localStorage.setItem('session_id', response.data.session_id)
                  }
                }
                return response
              })
              .catch((response) => {
                console.log("Axios Error: " + response);
              });
              return respone
          } catch (e) {
            console.log("Promise error" + e);
          }
      },
  },
};
