const navigationHook = document.querySelectorAll('.navigation button');
const replaceImageButton = document.getElementById('replace-image-button');
const imageInputField = document.getElementById('machineImage');
const anl_ID = document.getElementById('anl_ID').value;
// const getMachineHook = () => {
//     console.log(this);
//     let type = this.attr('event-type');
//     let machine_id = $('.navigation').attr('data-value');
//     getMachineData(machine_id, type);
// }

const getMachineData = (machine_id, type) => {
    let container = document.getElementById('data-card');
    let spinner = new Spinner();
    spinner.spin(container);
    $.ajax({
        url:'/dashboard/machine',
        type: 'POST',
        data: {
            id:machine_id,
            type:type
        },
    }).done( function(response) {
        const data = response.data;
        console.log('data',data);
       // console.log(data);
        spinner.stop();
        if(response.code == 200 ){
            $('.navigation').attr('data-value', data.anl_ID);
            $('#anl_ID').val(data.anl_ID);
            $('#anlage').val(data.anlage);
            $('#programm').val(data.programm);
            $('#artikel').val(data.artikel);
            $('#bestellung').val(data.bestellung);
            // $('#bisher_produziert').val(data.bisher_produziert);
            $('#auftragsmenge').val(data.auftragsmenge);
            $('#gutmenge').val(data.gutmenge);
            $('#ausschuss').val(data.ausschuss);
            $('#zeit_zyklus').val(data.zeit_zyklus);
            if(data.programm == 'Automatik'){
                data.letzte_störung = " ";
            }
            $('#letzte_störung').val(data.letzte_störung);
            $('#werkzeug').val(data.werkzeug);
            $('#kavitäten').val(data.kavitäten);
            $('#machine-image').attr('src',data.bildAnl);
            $("#machine-image").on("error", function () {
                $(this).attr("src", "images/Blasanlage.jpg");
            });
            let inputContainer = document.getElementById("shards");
            let shardsData = data.shardsData;
            if(data.shards >= 1) {
                let html = '';
                for (const shard in shardsData) {
                    html += `<div class="form-group row">
                                <label for="${shard}" class="col-sm-2 col-form-label">${shard}</label>
                                <div class="col-sm-4">
                                    <input class="form-control" type="text" placeholder="${shard}" value="${shardsData[shard]}" readonly>
                                </div>
                            </div>`;
                };
                inputContainer.innerHTML = html;
            } else {
                document.getElementById("shard").style.display = "none";
            }
        } else if(response.anl_ID !== undefined) {
            toastr.error(response.message);
            $('.navigation').attr('data-value', response.anl_ID);
            $('#anlage').val("");
            $('#programm').val("");
            $('#artikel').val("");
            $('#bestellung').val("");
            // $('#bisher_produziert').val("");
            $('#auftragsmenge').val("");
            $('#gutmenge').val("");
            $('#ausschuss').val("");
            $('#zeit_zyklus').val("");
            $('#letzte_störung').val("");
            $('#werkzeug').val("");
            $('#kavitäten').val("");
            $('#machine-image').attr('src','images/Blasanlage.jpg');

        }

    });
}

//adding event listener to navigation buttons
navigationHook.forEach((node)=>{
    node.addEventListener('click', function(){
        let type = this.getAttribute('event-type');
        let machine_id = $('.navigation').attr('data-value');
        getMachineData(machine_id, type);
    });
});

const loadFile = (event) => {
    let output = document.getElementById('machine-image');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
};

//Firing click event on button click
replaceImageButton.addEventListener('click', () => {
    imageInputField.click();
});
imageInputField.addEventListener('change', loadFile);
imageInputField.addEventListener('change', () => {
    const machineImage = document.getElementById('machineImage');
    var myFormData = new FormData();
    var files = machineImage.files;
    var file = files[0];
    const anl_ID = $('#anl_ID').val();
    myFormData.append('file',file);
    myFormData.append('anl_ID',anl_ID);

    $.ajax({
        headers:{'X-CSRF-Token':$('meta[name=csrf_token]').attr('content')},
        type:"post",
        async: true,
        contentType: false,
        cache: false,
        processData:false,
        url:`/uploadImage`,
        data:myFormData,
        success:function(){
            console.log("success");
        }
    });

});

var intervalId = window.setInterval(function(){
    let type = "current";
    let machine_id = $('.navigation').attr('data-value');
   // console.log(machine_id);
    getMachineData(machine_id, type);
}, 10000);
