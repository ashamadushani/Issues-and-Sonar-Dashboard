/**
 * Created by sajinie on 10/8/17.
 */
var currentArea;
var currentProduct;
var currentVersion;
var currentComponent;
var currentIssueIssueType;
var currentIssueSeverity;
var issueBoth;
var currentSonarIssueType;
var currentSonarSeverity;
var sonarBoth;

var currentIssueMainChartData;
var currentIssueIssueTypeChartData;
var currentIssueSeverityChartData;
var currentSonarMainChartData;
var currentSonarIssueTypeChartData;
var currentSonarSeverityChartData;

var currentIssueMainChartTitle;
var currentIssueIssueTypeChartTitle;
var currentIssueSeverityChartTitle;
var currentSonarMainChartTitle;
var currentSonarIssueTypeChartTitle;
var currentSonarSeverityChartTitle;

var currentAreaId;
var currentProductId;
var currentComponentId;
var currentCategoryId;

var issueMainChart;
var issueIssuetypeChart;
var issueSeverityChart;
var sonarMainChart;
var sonarIssuetypeChart;
var sonarSeverityChart;

var currentData;
var issueIssueTypeIsSelected;
var issueSeverityIsSelected;
var sonarIssueTypeIsSelected;
var sonarSeverityIsSelected;

var currentIssueIssueType;
var currentIssueSeverity;
var currentSonarIssueType;
var currentSonarSeverity;

var currentCategory;

function initPage() {
    debugger;
    var sidePaneDetails;
    var content;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/issues/all',
        // url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/issues/all',
        async: false,
        success: function(data){
            debugger;
            sidePaneDetails = data.data.items;
            content = data.data;
            currentData = data.data;
        }
    });
    debugger;
    issueIssueTypeIsSelected = false;
    issueSeverityIsSelected = false;
    sonarIssueTypeIsSelected = false;
    sonarSeverityIsSelected = false;

    currentIssueIssueType = 0;
    currentIssueSeverity = 0;
    currentSonarIssueType = 0;
    currentSonarSeverity = 0;

    currentCategory = "all";
    currentCategoryId = 0;

    loadSidePane(sidePaneDetails);
    debugger;
    loadTypeAndSeverityDropdowns();
    initChart(content);
    debugger;
    initSonarChart(content);


}
function loadTypeAndSeverityDropdowns() {
    var issueIssueTypes;
    var issueSeverities;
    var sonarIssueTypes;
    var sonarSeverities;
    $.ajax({
        type: "GET",
        // url: 'https://192.168.8.100:9092/internal/product-quality/v1.0/jira/getIssueTypesAndSeverities',
        url: 'https://10.100.4.110:9092/internal/product-quality/v1.0/jira/getIssueTypesAndSeverities',
        async: false,
        success: function(data){
            debugger;
            issueIssueTypes = data.data.issueIssuetypes;
            issueSeverities = data.data.issueSeverities;
            debugger;
            sonarIssueTypes = data.data.sonarIssuetypes;
            sonarSeverities = data.data.sonarSeverities;
            debugger;
        }
    });
    loadTypeAndSeverityDropdownsForIssues(issueIssueTypes, issueSeverities);
    loadTypeAndSeverityDropdownsForSonar(sonarIssueTypes, sonarSeverities);
}

function loadTypeAndSeverityDropdownsForSonar(issueTypes, severities) {

    var selectIssueType = document.getElementById('sonar-issuetype-choice');
    var  totalIssueTypes = issueTypes.length;
    for(var a=0; a<totalIssueTypes; a++) {
        var option1 = document.createElement('option');
        var typeId =  issueTypes[a].id;
        var typeName =  issueTypes[a].type;

        option1.setAttribute("value",typeId);
        option1.setAttribute("style","font-size: 100%");
        option1.appendChild(document.createTextNode(typeName));
        selectIssueType.appendChild(option1);
    }

    selectIssueType.addEventListener('change',function(){
        var e = document.getElementById("sonar-issuetype-choice");
        var selectedSonarType = e.options[e.selectedIndex].value;
        debugger;
        for (var i = 0; i < sonarIssuetypeChart.series[0].data.length; i++) {
            sonarIssuetypeChart.series[0].data[i].update({ color: '#a2a3a3' }, true, false);
        }
        sonarIssuetypeChart.get(parseInt(selectedSonarType)).update({ color: '#118983' }, true, false);
        sonarIssuetypeChart.get(parseInt(selectedSonarType)).select();
        selectSonarIssueTypePieChart(parseInt(selectedSonarType));
    });


    var selectSeverity = document.getElementById('sonar-severity-choice');
    var  totalSeverities = severities.length;
    for(var i=0; i<totalSeverities; i++) {
        var option = document.createElement('option');
        var id =  severities[i].id;
        var name =  severities[i].severity;

        option.setAttribute("value",id);
        option.appendChild(document.createTextNode(name));
        selectSeverity.appendChild(option);
    }

    selectSeverity.addEventListener('change',function(){
        var e = document.getElementById("sonar-severity-choice");
        var selectedSonarSeverity = e.options[e.selectedIndex].value;
        debugger;
        for (var i = 0; i < sonarSeverityChart.series[0].data.length; i++) {
            debugger;
            sonarSeverityChart.series[0].data[i].update({ color: '#a2a3a3' }, true, false);
        }
        sonarSeverityChart.get(parseInt(selectedSonarSeverity)).update({ color: '#118983' }, true, false);
        sonarSeverityChart.get(parseInt(selectedSonarSeverity)).select();
        selectSonarSeverityPieChart(parseInt(selectedSonarSeverity));
    });
}

function loadTypeAndSeverityDropdownsForIssues(issueTypes, severities) {

    var selectIssueType = document.getElementById('issuetype-choice');
    var  totalIssueTypes = issueTypes.length;
    for(var a=0; a<totalIssueTypes; a++) {
        var option1 = document.createElement('option');
        var typeId =  issueTypes[a].pqd_issue_type_id;
        var typeName =  issueTypes[a].pqd_issue_type;

        option1.setAttribute("value",typeId);
        option1.appendChild(document.createTextNode(typeName));
        selectIssueType.appendChild(option1);
    }

    selectIssueType.addEventListener('change',function(){
        var e = document.getElementById("issuetype-choice");
        var selectedType = e.options[e.selectedIndex].value;
        debugger;
        for (var i = 0; i < issueIssuetypeChart.series[0].data.length; i++) {
            issueIssuetypeChart.series[0].data[i].update({ color: '#a2a3a3' }, true, false);
        }
        console.log(selectedType);
        issueIssuetypeChart.get(parseInt(selectedType)).update({ color: '#118983' }, true, false);
        issueIssuetypeChart.get(parseInt(selectedType)).select();
        selectIssueIssueTypePieChart(parseInt(selectedType));
    });


    var selectSeverity = document.getElementById('severity-choice');
    var  totalSeverities = severities.length;
    for(var i=0; i<totalSeverities; i++) {
        var option = document.createElement('option');
        var id =  severities[i].pqd_severity_id;
        var name =  severities[i].pqd_severity;

        option.setAttribute("value",id);
        option.appendChild(document.createTextNode(name));
        selectSeverity.appendChild(option);
    }

    selectSeverity.addEventListener('change',function(){
        var e = document.getElementById("severity-choice");
        var selectedSeverity = e.options[e.selectedIndex].value;
        debugger;
        for (var i = 0; i < issueSeverityChart.series[0].data.length; i++) {
            issueSeverityChart.series[0].data[i].update({ color: '#a2a3a3' }, true, false);
        }
        issueSeverityChart.get(parseInt(selectedSeverity)).update({ color: '#118983' }, true, false);
        issueSeverityChart.get(parseInt(selectedSeverity)).select();
        selectIssueSeverityPieChart(parseInt(selectedSeverity));
    });


}


function selectIssueIssueTypePieChart(issueTypeId) {
    currentIssueIssueType = issueTypeId;
    if (issueTypeId !== 0){
        issueIssueTypeIsSelected = true;
    }

    var url = 'https://10.100.4.222:9092/internal/product-quality/v1.0/github/issues/issuetype/'+issueTypeId+'/severity/'+currentIssueSeverity;

    if (issueSeverityIsSelected === true){
        debugger;
        document.getElementById("severity-choice").disabled = true;
    }

    var content;
    $.ajax({
        type: "GET",
        url: url,
        data:{
            category: currentCategory,
            categoryId: currentCategoryId
        },
        async: false,
        success: function(data){
            debugger;
            content = data.data;
            currentData = content;
        }
    });

    initChart(content);
}

function selectIssueSeverityPieChart(severityId) {
    currentIssueSeverity = severityId;
    if (severityId !== 0){
        issueSeverityIsSelected = true;
    }
    var url = 'https://10.100.4.222:9092/internal/product-quality/v1.0/github/issues/issuetype/'+currentIssueIssueType+'/severity/'+severityId;


    if (issueIssueTypeIsSelected === true){
        debugger;
        document.getElementById("issuetype-choice").disabled = true;
    }

    var content;
    $.ajax({
        type: "GET",
        url: url,
        data:{
            category: currentCategory,
            categoryId: currentCategoryId
        },
        async: false,
        success: function(data){
            debugger;
            content = data.data;
            currentData = content;
        }
    });
    initChart(content);
}

function selectSonarIssueTypePieChart(issueTypeId) {

    debugger;
    currentSonarIssueType = issueTypeId;
    if(issueTypeId !== 0){
        debugger;
        sonarIssueTypeIsSelected = true;

    }
    var url = 'https://10.100.4.222:9092/internal/product-quality/v1.0/sonar/issues/issuetype/'+issueTypeId+'/severity/'+currentSonarSeverity;

    if (sonarSeverityIsSelected === true){
        debugger;
        document.getElementById("sonar-severity-choice").disabled = true;
    }

    var content;
    $.ajax({
        type: "GET",
        url: url,
        data:{
            category: currentCategory,
            categoryId: currentCategoryId
        },
        async: false,
        success: function(data){
            debugger;
            content = data.data;
            currentData = content;
        }
    });
    initSonarChart(content);
}

function selectSonarSeverityPieChart(severityId) {
    currentSonarSeverity = severityId;
    if(severityId !== 0){
        debugger;
        sonarSeverityIsSelected = true;
    }
    var url = 'https://10.100.4.222:9092/internal/product-quality/v1.0/sonar/issues/issuetype/'+currentSonarIssueType+'/severity/'+severityId;

    if (sonarIssueTypeIsSelected === true){
        debugger;
        document.getElementById("sonar-issuetype-choice").disabled = true;
    }
    var content;
    $.ajax({
        type: "GET",
        url: url,
        data:{
            category: currentCategory,
            categoryId: currentCategoryId
        },
        async: false,
        success: function(data){
            debugger;
            content = data.data;
            currentData = content;
        }
    });
    initSonarChart(content);
}

function resetSonarCharts() {
    currentSonarIssueType = 0;
    currentSonarSeverity = 0;
    sonarIssueTypeIsSelected = false;
    sonarSeverityIsSelected = false;

    document.getElementById("sonar-issuetype-choice").disabled = false;
    document.getElementById("sonar-severity-choice").disabled = false;
    document.getElementById("sonar-issuetype-choice").selectedIndex = "0";
    document.getElementById("sonar-severity-choice").selectedIndex = "0";

    debugger;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/sonar/issues/issuetype/'+currentSonarIssueType+'/severity/'+currentSonarSeverity,
        async: false,
        data:{
            category: currentCategory,
            categoryId: currentCategoryId
        },
        success: function(data){
            debugger;
            content = data.data;
            currentData = content;
        }
    });

    initSonarChart(content);
    debugger;
}

function resetIssueCharts() {
    currentIssueIssueType = 0;
    currentIssueSeverity = 0;
    issueIssueTypeIsSelected = false;
    issueSeverityIsSelected = false;

    document.getElementById("issuetype-choice").disabled = false;
    document.getElementById("severity-choice").disabled = false;
    document.getElementById("issuetype-choice").selectedIndex = "0";
    document.getElementById("severity-choice").selectedIndex = "0";

    debugger;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/github/issues/issuetype/'+currentIssueIssueType+'/severity/'+currentIssueSeverity,
        async: false,
        data:{
            category: currentCategory,
            categoryId: currentCategoryId
        },
        success: function(data){
            debugger;
            content = data.data;
            currentData = content;
        }
    });

    initChart(content);
    debugger;
}

function loadSidePane(sidePaneDetails) {
    debugger;
    var totalProducts = sidePaneDetails.length;
    debugger;
    for (var x = 0; x < totalProducts; x++) {
        document.getElementById('area').innerHTML += "<div class='panel' style='margin-top:-4px; margin-bottom:-4px; font-size: 100%;'><button onclick='leftMenuAreaClick("+sidePaneDetails[x].id+")' data-parent='#area' href='#collapseArea"+(sidePaneDetails[x].id)+"' data-toggle='collapse' id='"+(sidePaneDetails[x].id)+"' class='list-group-item'>"
            + sidePaneDetails[x].name        +
            "<span id='sonarCount"+(parseInt(x)+1)+"' class='badge' style='min-width:35px; background-color:#4BC2DE;padding:3px 6px;'></span>" +
            "<span id='issueCount"+(parseInt(x)+1)+"' class='badge' style='min-width:30px; background-color:#F4A94E; padding:3px 6px;'></span></button>" +
            "<div id='collapseArea"+(sidePaneDetails[x].id)+"'  style='transition: all .8s ease;' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingOne'>" +
            "<div class='sidebarInside'>" +
            "<ul id='product"+(sidePaneDetails[x].id)+"' >"+
            ""+
            "</ul>"+
            "</div>" +
            "</div>" +
            "</div>"

        document.getElementById('issueCount'+(parseInt(x)+1)).innerHTML = sidePaneDetails[x].issues;
        document.getElementById('sonarCount'+(parseInt(x)+1)).innerHTML = sidePaneDetails[x].sonar;
    }
}

function leftMenuAreaClick(areaId){
    currentCategoryId = areaId;
    currentCategory = "area";
    currentAreaId = areaId;

    issueIssueTypeIsSelected = false;
    issueSeverityIsSelected = false;
    sonarIssueTypeIsSelected = false;
    sonarSeverityIsSelected = false;

    currentIssueIssueType = 0;
    currentIssueSeverity = 0;
    currentSonarIssueType = 0;
    currentSonarSeverity = 0;


    debugger;
    document.getElementById('componentChoice').innerHTML = "";
    document.getElementById('product'+(areaId)).innerHTML = "";
    document.getElementById("issuetype-choice").disabled = false;
    document.getElementById("severity-choice").disabled = false;
    document.getElementById("sonar-issuetype-choice").disabled = false;
    document.getElementById("sonar-severity-choice").disabled = false;

    document.getElementById("issuetype-choice").selectedIndex = "0";
    document.getElementById("severity-choice").selectedIndex = "0";
    document.getElementById("sonar-issuetype-choice").selectedIndex = "0";
    document.getElementById("sonar-severity-choice").selectedIndex = "0";

    var sidePaneDetails;
    var content;
    debugger;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/issues/area/'+ areaId,
        async: false,
        success: function(data){
            debugger;
            sidePaneDetails = data.data.items;
            content = data.data;
            currentData = content;
        }
    });
    debugger;

    var totalProducts = sidePaneDetails.length;

    for(var y=0;y<totalProducts;y++){
        issuecount = sidePaneDetails[y].issues;
        sonarCount = sidePaneDetails[y].sonar;

        document.getElementById('product'+(areaId)).innerHTML +=
            "<button onclick='leftMenuProductClick("+(sidePaneDetails[y].id)+")' class='list-group-item list-group-item-info' style='width:100%;text-align: left;' id='" + sidePaneDetails[y].id + "'>" +
            sidePaneDetails[y].name +
            "<span id='sonarProductCount"+areaId+(parseInt(y))+"' class='badge' style='min-width:40px; background-color:#4BC2DE;padding:3px 6px;'></span>" +
            "<span id='issueProductCount"+areaId+(parseInt (y))+"' class='badge' style='min-width:30px; background-color:#F4A94E; padding:3px 6px;'></span></button>";
        
        document.getElementById('issueProductCount'+areaId+(parseInt(y))).innerHTML = issuecount;
        document.getElementById('sonarProductCount'+areaId+(parseInt(y))).innerHTML = sonarCount;
    }

    initChart(content);
    initSonarChart(content);
}

function leftMenuProductClick(productId) {
    debugger;
    currentCategoryId = productId;
    currentCategory = "product";

    currentIssueIssueType = 0;
    currentIssueSeverity = 0;
    currentSonarIssueType = 0;
    currentSonarSeverity = 0;

    issueIssueTypeIsSelected = false;
    issueSeverityIsSelected = false;
    sonarIssueTypeIsSelected = false;
    sonarSeverityIsSelected = false;

    document.getElementById("issuetype-choice").disabled = false;
    document.getElementById("severity-choice").disabled = false;
    document.getElementById("sonar-issuetype-choice").disabled = false;
    document.getElementById("sonar-severity-choice").disabled = false;

    document.getElementById("issuetype-choice").selectedIndex = "0";
    document.getElementById("severity-choice").selectedIndex = "0";
    document.getElementById("sonar-issuetype-choice").selectedIndex = "0";
    document.getElementById("sonar-severity-choice").selectedIndex = "0";


    var sidePaneDetails;
    var content;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/issues/product/'+productId ,
        async: false,
        success: function(data){
            debugger;
            sidePaneDetails = data.data.items;
            content = data.data;
            currentData = data.data;
        }
    });

    loadComponentDropdown(sidePaneDetails);

    initChart(content);
    debugger;
    initSonarChart(content);
}

function leftMenuVersionClick(version) {
    currentProductId = productId;
    currentVersion = version;
    currentComponentId = 0;

    currentIssueIssueType = 0;
    currentIssueSeverity = 0;
    currentSonarIssueType = 0;
    currentSonarSeverity = 0;

    var sidePaneDetails;
    var content;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.110:9092/internal/product-quality/v1.0/jira/issues/summary/' + productId + '/version/' + version,
        async: false,
        success: function(data){
            debugger;
            sidePaneDetails = data.data.items;
            content = data.data;
            currentData = data.data;
        }
    });

    currentCategory = "version";
    initChart("version", content);
    debugger;
    loadComponentDropdown(sidePaneDetails);
}


function loadComponentDropdown(sidePaneDetails) {
    debugger;

    document.getElementById('componentChoice').innerHTML = "";
    var item = document.getElementById('componentChoice');
    var div1 = document.createElement('div');
    div1.setAttribute("class","col-xs-1 col-md-1");
    var headingTag = document.createElement("h4");
    var heading = document.createTextNode("Component");
    headingTag.appendChild(heading);
    div1.appendChild(headingTag);
    item.appendChild(div1);
    debugger;
    var div2 = document.createElement('div');
    div2.setAttribute("class","col-xs-2 col-md-2");
    div2.setAttribute("style","text-align: left");

    var div3 = document.createElement('div');
    div3.setAttribute("class","form-group");
    debugger;
    var select = document.createElement('select');
    select.setAttribute("class","form-control");
    select.setAttribute("id","sel1");
    select.setAttribute("style","width:300px; padding: 5px 0px 5px 0px;");
    debugger;

    if(sidePaneDetails.length !== 0){
        var  totalComponents = sidePaneDetails.length;
        for(var a=0; a<totalComponents; a++) {
            var option = document.createElement('option');
            var id =  sidePaneDetails[a].id;
            var name =  sidePaneDetails[a].name;

            option.setAttribute("value",id);
            option.appendChild(document.createTextNode(name));
            select.appendChild(option);
        }
    }
    debugger;

    div3.appendChild(select);
    div2.appendChild(div3);
    item.appendChild(div2);

    debugger;
    select.addEventListener('change',function(){
        var e = document.getElementById("sel1");
        var strUser = e.options[e.selectedIndex].value;
        debugger;
        for (var i = 0; i < issueMainChart.series[0].data.length; i++) {
            issueMainChart.series[0].data[i].update({ color: '#a2a3a3' }, true, false);
        }
        issueMainChart.get(parseInt(strUser)).update({ color: '#118983' }, true, false);

        for (var i = 0; i < sonarMainChart.series[0].data.length; i++) {
            sonarMainChart.series[0].data[i].update({ color: '#a2a3a3' }, true, false);
        }
        sonarMainChart.get(parseInt(strUser)).update({ color: '#118983' }, true, false);
        loadComponentDetails(parseInt(strUser));
    });


}


function loadComponentDetails(componentId) {
    debugger;
    currentCategoryId = componentId;
    currentCategory = "component";

    currentIssueIssueType = 0;
    currentIssueSeverity = 0;
    currentSonarIssueType = 0;
    currentSonarSeverity = 0;

    issueIssueTypeIsSelected = false;
    issueSeverityIsSelected = false;
    sonarIssueTypeIsSelected = false;
    sonarSeverityIsSelected = false;

    document.getElementById("issuetype-choice").disabled = false;
    document.getElementById("severity-choice").disabled = false;
    document.getElementById("sonar-issuetype-choice").disabled = false;
    document.getElementById("sonar-severity-choice").disabled = false;

    document.getElementById("issuetype-choice").selectedIndex = "0";
    document.getElementById("severity-choice").selectedIndex = "0";
    document.getElementById("sonar-issuetype-choice").selectedIndex = "0";
    document.getElementById("sonar-severity-choice").selectedIndex = "0";


    debugger;
    var content;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/issues/component/' + componentId,
        async: false,
        success: function(data){
            debugger;
            content = data.data;
            currentData = data.data;
        }
    });


    initChart(content);
    initSonarChart(content);
}


function initChart(content) {
    debugger;
    //set the data for main chart
    if (currentCategory !== "component"){
        debugger;
        productData = content.items;

        mainSeriesData = [];
        totalMainIssues = 0;

        if(productData.length !== 0){

            for(var i = 0; i < productData.length; i++){
                name = productData[i].name;
                id = productData[i].id;
                y = productData[i].issues;
                totalMainIssues += y;

                mainSeriesData.push({name: name, id:id, y: y});
            }

        }
        currentIssueMainChartTitle = "Total : " + totalMainIssues;

        currentIssueMainChartData = [{
            name: "Products",
            colorByPoint: true, data: mainSeriesData
        }]
        createMainChart();
    }
    if (currentCategory === "component"){
        debugger;
        productData = content.items;

        mainSeriesData = [];
        totalMainIssues = 0;

        if(productData.length !== 0){

            for(var i = 0; i < productData.length; i++){
                name = productData[i].name;
                id = productData[i].id;
                y = productData[i].issues;
                totalMainIssues += y;
                
                if (id === currentCategoryId){
                    mainSeriesData.push({name: name, id:id, y: y, color: '#118983'});
                }else{
                    mainSeriesData.push({name: name, id:id, y: y, color: '#a2a3a3'});
                }
            }

        }
        currentIssueMainChartTitle = "Total : " + totalMainIssues;

        currentIssueMainChartData = [{
            name: "Products",
            colorByPoint: true, data: mainSeriesData
        }]
        createMainChart();
    }

    //set the data for the issuetype chart
    if(issueIssueTypeIsSelected === false){
        debugger;
        issuetypeData = content.issueIssuetype;

        issuetypeSeriesData = [];
        totalIssuetypeIssues = 0;

        if(issuetypeData.length !== 0){

            for(var i = 0; i < issuetypeData.length; i++){
                name = issuetypeData[i].name;
                id = issuetypeData[i].id;
                y = issuetypeData[i].issues;
                totalIssuetypeIssues += y;

                issuetypeSeriesData.push({name: name, id:id, y: y});
            }
        }
        currentIssueIssueTypeChartData = [{
            name: "Issue type",
            colorByPoint: true, data: issuetypeSeriesData
        }]

        currentIssueIssueTypeChartTitle = "Total : " + totalIssuetypeIssues;
        createIssueTypeChart();
    }


    if(issueSeverityIsSelected === false){
        debugger;
        //set the data for the severity chart
        severityData = content.issueSeverity;

        severitySeriesData = [];
        totalSeverityIssues = 0;

        if(severityData.length !== 0){

            for(var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                id = severityData[i].id;
                y = severityData[i].issues;
                totalSeverityIssues += y;

                severitySeriesData.push({name: name, id:id, y: y});
            }
        }

        currentIssueSeverityChartData = [{
            name: "Severity",
            colorByPoint: true, data: severitySeriesData
        }]
        currentIssueSeverityChartTitle = "Total : " + totalSeverityIssues;
        createSeverityChart();
    }

    // createIssueCharts(category);

    debugger;
    var dateFrom = moment().subtract(29, 'days');
    var dateTo= moment();
    this.startDate = dateFrom.format('YYYY-MM-DD');
    this.endDate = dateTo.format('YYYY-MM-DD');
    this.period = "day";
    // history(category, "day");
    getIssueTrendLineHistory("day")
    debugger;
}

function initSonarChart(content) {
    debugger;

    //set the data for main chart
    if (currentCategory !== "component"){
        debugger;
        productData = content.items;

        mainSeriesData = [];
        totalMainIssues = 0;

        if(productData.length !== 0){

            for(var i = 0; i < productData.length; i++){
                name = productData[i].name;
                id = productData[i].id;
                y = productData[i].sonar;
                totalMainIssues += y;

                mainSeriesData.push({name: name, id:id, y: y});
            }
        }


        currentSonarMainChartTitle = "Total : " + totalMainIssues;

        currentSonarMainChartData = [{
            name: "Products",
            colorByPoint: true, data: mainSeriesData
        }]

        createSonarMainChart();

    }

    //set the data for the issuetype chart
    if(sonarIssueTypeIsSelected === false){

        debugger;
        issuetypeData = content.sonarIssuetype;
        console.log(issuetypeData);

        debugger;
        issuetypeSeriesData = [];
        totalIssuetypeIssues = 0;

        if(issuetypeData.length !== 0){

            for(var i = 0; i < issuetypeData.length; i++){
                debugger;
                name = issuetypeData[i].name;
                console.log(name);
                debugger;
                id = issuetypeData[i].id;
                console.log(id);
                debugger;
                y = issuetypeData[i].sonar;
                totalIssuetypeIssues += y;

                issuetypeSeriesData.push({name: name, id:id, y: y});
            }

        }

        currentSonarIssueTypeChartData = [{
            name: "Issue type",
            colorByPoint: true, data: issuetypeSeriesData
        }]

        currentSonarIssueTypeChartTitle = "Total : " + totalIssuetypeIssues;
        createSonarIssueTypeChart();
    }


    if(sonarSeverityIsSelected === false){
        //set the data for the severity chart
        severityData = content.sonarSeverity;

        severitySeriesData = [];
        totalSeverityIssues = 0;

        if(severityData.length !== 0){
            for(var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                id = severityData[i].id;
                y = severityData[i].sonar;
                totalSeverityIssues += y;

                severitySeriesData.push({name: name, id:id, y: y});
            }
        }

        currentSonarSeverityChartData = [{
            name: "Severity",
            colorByPoint: true, data: severitySeriesData
        }]
        currentSonarSeverityChartTitle = "Total : " + totalSeverityIssues;
        createSonarSeverityChart();
    }


    // createSonarCharts(category);

    debugger;
    var dateFrom = moment().subtract(29, 'days');
    var dateTo= moment();
    this.startDate = dateFrom.format('YYYY-MM-DD');
    this.endDate = dateTo.format('YYYY-MM-DD');
    this.period = "day";
    // history(category, "day");
    getSonarTrendLineHistory("day");
    debugger;

}


function createMainChart(){
    //Create the chart
    debugger;
    this.issueMainChart = Highcharts.chart('main-chart-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: currentIssueMainChartTitle
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total open issues'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                },
                allowPointSelect: false,
            }, column: {
                maxPointWidth: 100
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>'
        },

        series: currentIssueMainChartData,

        exporting: {
            enabled: true
        }
    });

}

function createMainChartForComponent(){
    //Create the chart
    debugger;
    this.issueMainChart = Highcharts.chart('main-chart-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: currentIssueMainChartTitle
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total open issues'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                },
                allowPointSelect: false,
            }, column: {
                maxPointWidth: 100
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>'
        },

        series: currentIssueMainChartData,

        exporting: {
            enabled: true
        }
    });

}
function createSonarMainChart(){
    //Create the chart
    debugger;
    this.sonarMainChart = Highcharts.chart('main-chart-container-sonar', {
        chart: {
            type: 'column'
        },
        title: {
            text: currentSonarMainChartTitle
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total Open Issues'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }, column: {
                maxPointWidth: 100
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>'
        },

        series: currentSonarMainChartData,

        exporting: {
            enabled: true
        }
    });

}

function createIssueTypeChart(){
    debugger;
    // Create the chart
    this.issueIssuetypeChart = Highcharts.chart('issuetype-chart-container', {
        chart: {
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        title: {
            text: currentIssueIssueTypeChartTitle
        },
        legend: {
            // layout: 'vertical',
            // align: 'right',
            // verticalAlign: 'top',
            // y: 50,
            // width: 100
            itemWidth: 150
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                slicedOffset: 30,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}',
                    distance: 5
                },
                showInLegend: true,
            }
        },
        // colors: ['#fff698', '#c8f0a8', '#50a35a', '#006d7c', '#66a6ae', '#d6a36e', '#b4e6ff', '#033656', '#deaa96'],
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: currentIssueIssueTypeChartData,
        exporting: {
            enabled: true
        }

    });
}
function createSonarIssueTypeChart(){
    debugger;
    // Create the chart
    this.sonarIssuetypeChart = Highcharts.chart('issuetype-chart-container-sonar', {
        chart: {
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        title: {
            text: currentSonarIssueTypeChartTitle
        },
        legend: {
            // layout: 'vertical',
            // align: 'right',
            // verticalAlign: 'top',
            // y: 50,
            // width: 100
            itemWidth: 150
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                slicedOffset: 30,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}',
                    distance: 5
                },
                showInLegend: true,
            }
        },
        // colors: ['#fff698', '#c8f0a8', '#50a35a', '#006d7c', '#66a6ae', '#d6a36e', '#b4e6ff', '#033656', '#deaa96'],
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: currentSonarIssueTypeChartData,
        exporting: {
            enabled: true
        }

    });
}


function createSeverityChart(){
    // Create the chart
    debugger;
    this.issueSeverityChart = Highcharts.chart('severity-chart-container', {
        chart: {
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        legend: {
            // layout: 'vertical',
            // align: 'right',
            // verticalAlign: 'top',
            // y: 50,
            itemWidth: 150
            // floating: false,
            // backgroundColor: '#FCFFC5'
        },
        title: {
            text: currentIssueSeverityChartTitle
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                slicedOffset: 30,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}',
                    distance: 5
                },
                showInLegend: true
            }
        },
        // colors: ['#ffdba2', '#ffafa2', '#dd5f5f', '#bf0a0a', '#781f1f', '#8d3f3f', '#450000'],
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: currentIssueSeverityChartData,
        exporting: {
            enabled: true
        }

    });
}

function createSonarSeverityChart(){
    // Create the chart
    debugger;
    this.sonarSeverityChart = Highcharts.chart('severity-chart-container-sonar', {
        chart: {
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        legend: {
            // layout: 'vertical',
            // align: 'right',
            // verticalAlign: 'top',
            // y: 50,
            itemWidth: 150
            // floating: false,
            // backgroundColor: '#FCFFC5'
        },
        title: {
            text: currentSonarSeverityChartTitle
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                slicedOffset: 30,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}',
                    distance: 5
                },
                showInLegend: true
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: currentSonarSeverityChartData,
        exporting: {
            enabled: true
        }

    });
}




function getIssueTrendLineHistory(period) {
    debugger;
    var historyForAll;
    var history;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/github/issues/history/'+ currentCategory + '/' + currentCategoryId,
        data:{
            severityId: currentIssueSeverity,
            issuetypeId: currentIssueIssueType,
            dateFrom : this.startDate,
            dateTo : this.endDate,
            period: period
        },
        async: false,
        success: function(data){
            console.log("checking");
            console.log(data.data);
            history = data.data;
        }
    });
    debugger;
    historySeriesData = [];

    for(var i = 0; i < history.length; i++){
        name = history[i].date;
        y = history[i].count;
        historySeriesData.push({name: name, y: y});
    }
    debugger;
    createIssueTrendChart(historySeriesData);
}

function getSonarTrendLineHistory(period) {
    debugger;
    var historyForAll;
    var history;
    $.ajax({
        type: "GET",
        url: 'https://10.100.4.222:9092/internal/product-quality/v1.0/sonar/issues/history/'+ currentCategory + '/' + currentCategoryId,
        data:{
            issuetypeId: currentSonarIssueType,
            severityId: currentSonarSeverity,
            dateFrom : this.startDate,
            dateTo : this.endDate,
            period: period
        },
        async: false,
        success: function(data){
            history = data.data;
            console.log(history);
        }
    });
    debugger;
    historySeriesData = [];

    for(var i = 0; i < history.length; i++){
        name = history[i].date;
        y = history[i].count;
        historySeriesData.push({name: name, y: y});
    }
    debugger;
    createSonarTrendChart(historySeriesData);

}


function createIssueTrendChart(data){
    debugger;
    Highcharts.chart('trend-chart-container', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: ""
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Number of Issues'
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
        },
        series: [{
            type: 'line',
            // name: 'USD to EUR',
            data: data
        }]

    });

}
function createSonarTrendChart(data){
    debugger;
    Highcharts.chart('trend-chart-container-sonar', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: ""
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Number of Issues'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
        },
        series: [{
            type: 'line',
            // name: 'USD to EUR',
            data: data
        }]

    });

}



