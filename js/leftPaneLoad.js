/**
 * Created by sajinie on 10/3/17.
 */

var menuDrillDown=[{"products":"Product 1"},{"products":"Product 2"}];
var menuVersionDrillDown=[{"PRODUCT_NAME":"Product 1","VERSION":1},{"PRODUCT_NAME":"Product 2","VERSION":2},{"PRODUCT_NAME":"Product 1","VERSION":2},{"PRODUCT_NAME":"Product 2","VERSION":1}];
var queuedDetails = [{"PRODUCT_NAME":"Product 1","VERSION":1,"total":3},{"PRODUCT_NAME":"Product 2","VERSION":2,"total":3}];
window.onload = function() {
        var totalProducts = menuDrillDown.length;
        var versionCount = menuVersionDrillDown.length;
        for (var x = 0; x < totalProducts; x++) {
            document.getElementById('product').innerHTML += "<a href='#collapseProduct"+(parseInt(x)+1)+"' data-toggle='collapse' id='product"+(parseInt(x)+1)+"' class='list-group-item'>"
                + menuDrillDown[x].products +
                "<span id='productDevCount"+(parseInt(x)+1)+"' class='badge' style='background-color:#4BC2DE;padding:3px 6px;'></span>" +
                "<span id='productCount"+(parseInt(x)+1)+"' class='badge' style='background-color:#F4A94E; padding:3px 6px;'></span></a>" +
                "<div id='collapseProduct"+(parseInt(x)+1)+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingOne'>" +
                "<div>" +
                "<ul id='productVersion"+(parseInt(x)+1)+"'>"+
                ""+
                "</ul>"+
                "</div>" +
                "</div>"
        }

        //get versions to left side drill down
        for(var x=0;x<totalProducts;x++){
            //set first option as All versions
            document.getElementById('productVersion'+(parseInt(x)+1)).innerHTML +=
                "<button onclick='leftMenuClick("+(parseInt(x)+1)+","+1+")' class='list-group-item list-group-item-info' style='width:100%; text-align: left;' id='subVersion1'>Total Summary"+
                "</button>" +
                "<button onclick='leftMenuClick("+(parseInt(x)+1)+","+0+")' class='list-group-item list-group-item-info' style='width:100%;text-align: left;' id='subVersion0'>All Versions"+
                "</button>";
            for(var y=0;y<versionCount;y++){
                var element = document.getElementById('product'+(parseInt(x)+1)).innerHTML;
                if(element.split("<span")[0].trim() === menuVersionDrillDown[y].PRODUCT_NAME){
                    document.getElementById('productVersion' + (parseInt(x) + 1)).innerHTML +=
                        "<button onclick='leftMenuClick(" + (parseInt(x) + 1) + "," + (parseInt(y) + 1) + ")' class='list-group-item list-group-item-info' style='width:100%;text-align: left;' id='subVersion" + (parseInt(y) + 1) + "'>Version " +
                        menuVersionDrillDown[y].VERSION +
                        "</button>";
                }
            }
        }




        if(!jQuery.isEmptyObject(queuedDetails)){
            var count = queuedDetails.length;
            for(var x=0;x<totalProducts;x++){
                document.getElementById('productCount'+(parseInt(x)+1)).innerHTML = '';
            }

            if(count === undefined){
                for(var x=0;x<totalProducts;x++){
                    var element = document.getElementById('product'+(parseInt(x)+1)).innerHTML;
                    if(element.split("<span")[0].trim() === queuedDetails.PRODUCT_NAME.trim()){
                        document.getElementById('productCount'+(parseInt(x)+1)).innerHTML = queuedDetails.total;
                    }
                }
            }else{
                for(var x=0;x<totalProducts;x++){
                    for(var y=0;y<count;y++){
                        var element = document.getElementById('product'+(parseInt(x)+1)).innerHTML;
                        if(element.split("<span")[0].trim() === queuedDetails[y].PRODUCT_NAME.trim()){
                            document.getElementById('productCount'+(parseInt(x)+1)).innerHTML = queuedDetails[y].total;
                        }
                    }
                }
            }
        }else{
            for(var x=0;x<totalProducts;x++){
                document.getElementById('productCount'+(parseInt(x)+1)).innerHTML = '';
            }
        }


    }

