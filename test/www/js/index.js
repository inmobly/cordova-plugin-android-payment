/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        document.getElementById('submit_button').focus();
        var meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=1920, height=1080, initial-scale=0.5, maximum-scale=0.5";
        document.getElementsByTagName('head')[0].appendChild(meta);
        AndroidPayment.initialize();

        // meta.content = "user-scalable=no, initial-scale=1.0, width=device-width, height=device-height,minimum=1.0,maximum-scale=1.0";
    }



};

app.initialize();

function openLoader() {
    document.getElementById('container').style.opacity = 0.5;
    document.getElementById('loader').style.display = 'block';
}

function closeLoader() {
    document.getElementById('container').style.opacity = 1;
    document.getElementById('loader').style.display = 'none';
}


window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if(code === 38 ){ // up arrow
        e.preventDefault();
        if (document.activeElement.id === "submit_button") {
            document.getElementById('plan_id_text_field').focus()
        } else if(document.activeElement.id === "auxiliary_type_text_field") {
            document.getElementById('auxiliary_id_text_field').focus()
        } else if(document.activeElement.id === "submit_button_auxiliary") {
            document.getElementById('auxiliary_type_text_field').focus()
        }
    }else if(code === 40){ // down arrow
        e.preventDefault();
        if (document.activeElement.id === "plan_id_text_field") {
            document.getElementById('submit_button').focus()
        } else if(document.activeElement.id === "auxiliary_id_text_field") {
            document.getElementById('auxiliary_type_text_field').focus()
        } else if(document.activeElement.id === "auxiliary_type_text_field") {
            document.getElementById('submit_button_auxiliary').focus()
        }
    } else if(code === 39){ // right
        e.preventDefault();
        if (document.activeElement.id === "submit_button"
            || document.activeElement.id === "plan_id_text_field") {
            document.getElementById('auxiliary_id_text_field').focus()
        }
    }else if(code === 37){ // left
        e.preventDefault();
        if (document.activeElement.id === "auxiliary_id_text_field"
            || document.activeElement.id === "auxiliary_type_text_field"
            || document.activeElement.id === "submit_button_auxiliary") {
            document.getElementById('plan_id_text_field').focus()
        }
    }else if(code === 13){ // enter
        e.preventDefault();
        if (document.activeElement.id === "submit_button") {
            openLoader();
            submitSubscription();
        } else if(document.activeElement.id === "submit_button_auxiliary") {
            openLoader();
            submitAuxiliary();
        }
    }
};

 function submitSubscription  () {
     var plan_id = document.getElementById('plan_id_text_field').value;
     if(plan_id.length > 0){
         AndroidPayment.payForPackage(plan_id, function (response) {
             console.log("success:");
             console.log(response);
             console.log('-----------------------------------');
             closeLoader()
         }, function (response) {
             console.log("Error:");
             console.log(response);
             console.log('-----------------------------------');
             closeLoader()
         })
     } else{
         alert("invalid Inputs");
         closeLoader()
     }

}

function submitAuxiliary() {
    var auxiliary_id = document.getElementById('auxiliary_id_text_field').value;
    var type = document.getElementById("auxiliary_type_text_field").value;
    if(auxiliary_id.length > 0 && type.length > 0){
        AndroidPayment.payForAuxiliaryPackage(auxiliary_id, type, function (response) {
            console.log("success:");
            console.log(response);
            console.log('-----------------------------------');
            closeLoader()
        }, function (response) {
            console.log("Error:");
            console.log(response);
            console.log('-----------------------------------');
            closeLoader()
        })
    } else {
        alert("invalid Inputs");
        closeLoader()
    }
}
