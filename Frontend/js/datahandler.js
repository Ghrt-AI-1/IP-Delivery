"use strict";

/**
 * It fetches data from a given url, and then calls a callback function with the data as a parameter
 * @param url - the url to fetch
 * @param callbackFunctionName - the function that will be called when the data is received
 * @param [callbackErrorFunctionName=null] - the function that will be called when the response is not
 * ok
 * @param [method=GET] - GET, POST, PUT, DELETE
 * @param [body=null] - the body of the request, if any
 * @returns The function handleData is being returned.
 */

const handleData = function (
  url,
  callbackFunctionName,
  callbackErrorFunctionName = null,
  method = "GET",
  body = null
) {
  fetch(url, {
    method: method,
    body: body,
    headers: {
      "content-type": "application/json",
      "User-Agent":
        "DeliverYvesG1 (mct.be - https://github.com/DeWildeDaan/DeliverYvesG1-MCTS4)",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        console.warn(
          `>> Probleem bij de fetch(). Statuscode: ${response.status}`
        );
        if (callbackErrorFunctionName) {
          console.warn(
            `>> Callback errorfunctie ${callbackErrorFunctionName.name}(response) wordt opgeroepen`
          );
          callbackErrorFunctionName(response);
        } else {
          console.warn(
            ">> Er is geen callback errorfunctie meegegeven als parameter"
          );
        }
      } else {
        //console.info('>> Er is een response teruggekomen van de server');
        return response.json();
      }
    })
    .then(function (jsonObject) {
      if (jsonObject) {
        //console.info('>> JSONobject is aangemaakt');
        //console.info(`>> Callbackfunctie ${callbackFunctionName.name}(response) wordt opgeroepen`);
        callbackFunctionName(jsonObject);
      }
    });
  /*.catch(function(error) {
      console.warn(`>>fout bij verwerken json: ${error}`);
      if (callbackErrorFunctionName) {
        callbackErrorFunctionName(undefined);
      }
    })*/
};
