Parse.initialize("sZvh6DWMrFKPpjl6rhFLI6Voet4ehBKqeu2YVWq8", "3WyM6SycYxT3Ge6Z4mYePOtcdIURFsvWOFZ1DXIw");
    Parse.serverURL = "https://parseapi.back4app.com/";

    var urls = [];
    //getFtpUrl();

    //Get Ftp Urls From Database & View All URL in table
    async function getFtpUrl(){
        const bdftp = Parse.Object.extend("bdftp");
        const query = new Parse.Query(bdftp);

        query.equalTo("type", "File Server");
        const results = await query.find();
        console.log("Successfully retrieved " + results.length + " scores.");

        for (let i = 0; i < results.length; i++) {
            var object = results[i];
            urls.push(object.get('ftpurl'));
        }
        //console.log(urls);

        let html = '';
        for (let i = 0; i < results.length; i++) {
            html += '<tr><td>'+(i+1)+'</td> <td>'+ urls[i] +'</td> <td><i class="material-icons">edit</i></td> <td><i class="material-icons">delete</i></td></tr>';
        }
        document.getElementById("showUrl").innerHTML=html;
    }

    var getUrl;

    //Get URL From User & Check Dublicate
    function getUrlFromUser(){
        getUrl = document.getElementById("ftpurl").value;
        var getType = document.getElementById("serverType").value;
        console.log(getUrl);
        var dublicate = urls.includes(getUrl);

        if(getUrl.length <= 0 || getType.length <= 0){
            M.toast({html: 'Blank FTP URL or Type', classes: 'rounded  deep-orange accent-2'});
        }else if(dublicate){
            M.toast({html: 'Dublicate FTP URL', classes: 'rounded  red accent-2'});
            document.getElementById("ftpurl").value = '';
        } else {
            addFtpUrl(getUrl,getType);
        }

    }

    //Add FTP URL to Database
    function addFtpUrl(url,serverType){

        const bdFTP = Parse.Object.extend("bdftp");
        const bdftp = new bdFTP();

        bdftp.save({
            ftpurl: url,
            type: serverType,
            valid: true
        }).then(function (response) {
            //alert('FTP Url Add Successfully');
            M.toast({html: 'FTP URL Add Successfully', classes: 'rounded   lime darken-2'});
            getFtpUrl();
        }).catch(function (error) {
            alert('Error: ' + error.message);
        });
    }