/*
~   Copyright (c) WSO2 Inc. (http://wso2.com) All Rights Reserved.
~
~   Licensed under the Apache License, Version 2.0 (the "License");
~   you may not use this file except in compliance with the License.
~   You may obtain a copy of the License at
~
~        http://www.apache.org/licenses/LICENSE-2.0
~
~   Unless required by applicable law or agreed to in writing, software
~   distributed under the License is distributed on an "AS IS" BASIS,
~   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
~   See the License for the specific language governing permissions and
~   limitations under the License.
*/
    //The following is a sample data consisting name and email addresses
    
    var sampleData = [
        {
            id:'sisira@wso2.com',
            text:'sisira@wso2.com',
            ename:['Sisira Ranaweera'],
            image:['images/prof-pic2.png']
        },
        {
            id:'sadeepa@wso2.com',
            text:'sadeepa@wso2.com',
            ename:['Sadepa Sisiranath'],
            image:['images/prof-pic2.png']
        },
       
    ]
 

    //Custom function for select 2 templating
    function memberResult(result){

        if(result.loading != undefined && result.loading){
            return result.text;
        }

        var ename = '';
        if(result.ename != undefined){
            ename = result.ename;
        }

        return '<div class="result-container"><img class="pull-left" title="profile icon" alt="wso2" src="images/prof-pic2.png"><div class="pull-left engineer-detail"><h4>' + result.text +
                '</h4><p>' + ename + '</p></div><div class="clearfix"></div></div>'
    }

    $.fn.select2.amd.require(['select2/selection/search'], function (Search) {

        $(".engineers").select2({
        data: sampleData,
        multiple:false,
        allowClear: false,
        templateResult: memberResult,
        placeholder :'Enter name or e-mail address',        
        escapeMarkup:function(m){
            return m;
        },
    })

    });
