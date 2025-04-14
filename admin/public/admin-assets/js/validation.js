$(document).ready(function () {
    ///////user form validation
    $("#user-form").validate({
        rules: {
            title: 'required',
            first_name: 'required',
            email: {
                required: true,
                email: true,//add an email rule that will ensure the value entered is valid email id.
                maxlength: 255,
            },
            phone: 'required',
            mobile: 'required',
            password: 'required',
            confirm_password: {
                required: true,
                equalTo : "#password",
             },
            user_role: 'required',
            surname: 'required',
            fax: 'required',
            user_name: 'required',
        },
        messages: {
            title: 'Dieses Feld ist erforderlich',
            first_name: 'Dieses Feld ist erforderlich',
            email: 'Dieses Feld ist erforderlich',
            phone: 'Dieses Feld ist erforderlich',
            mobile: 'Dieses Feld ist erforderlich',
            password: 'Dieses Feld ist erforderlich',
            confirm_password: {
                required : 'Bestätigen Sie, dass ein Passwort erforderlich ist',
                equalTo : 'Passwort stimmt nicht überein',
            },
            user_role: 'Dieses Feld ist erforderlich',
            surname: 'Dieses Feld ist erforderlich',
            fax: 'Dieses Feld ist erforderlich',
            user_name: 'Dieses Feld ist erforderlich',
        }
    });
     ///////edit user form validation
     $("#edit-user").validate({
        rules: {
            title: 'required',
            first_name: 'required',
            email: {
                required: true,
                email: true,//add an email rule that will ensure the value entered is valid email id.
                maxlength: 255,
            },
            phone: 'required',
            mobile: 'required',
            user_role: 'required',
            surname: 'required',
            fax: 'required',
            user_name: 'required',
			password: 'required',
            confirm_password: {
                required: true,
                equalTo : "#password",
             },
        },
        messages: {
            title: 'Dieses Feld ist erforderlich',
            first_name: 'Dieses Feld ist erforderlich',
            email: 'Dieses Feld ist erforderlich',
            phone: 'Dieses Feld ist erforderlich',
            mobile: 'Dieses Feld ist erforderlich',
            user_role: 'Dieses Feld ist erforderlich',
            surname: 'Dieses Feld ist erforderlich',
            fax: 'Dieses Feld ist erforderlich',
            user_name: 'Dieses Feld ist erforderlich',
			password: 'Dieses Feld ist erforderlich',
            confirm_password: {
                required : 'Bestätigen Sie, dass ein Passwort erforderlich ist',
                equalTo : 'Passwort stimmt nicht überein',
            },
        }
    });
    ////////tenant-group form validation
    $("#tenant-form").validate({
        rules: {
            surname: 'required',
            abbreviation: 'required',
        },
        messages: {
            surname: 'Dieses Feld ist erforderlich',
            abbreviation: 'Dieses Feld ist erforderlich',
        }
    });
    //////////super admin form validation 
    $("#super-admin-form").validate({
        rules: {
            company: 'required',
            address: 'required',
            e_mail: {
                required: true,
                email: true,//add an email rule that will ensure the value entered is valid email id.
                maxlength: 255,
            },
            number_of_employees: 'required',
            chief_executive_officer: 'required',
            postcode: 'required',
            town: 'required',
            sphone: 'required',
            note: 'required',
            title: 'required',
            first_name: 'required',
            email: {
                required: true,
                email: true,//add an email rule that will ensure the value entered is valid email id.
                maxlength: 255,
            },
            phone: 'required',
            mobile: 'required',
            password: 'required',
            confirm_password: {
                required: true,
                equalTo : "#password",
             },
            user_role: 'required',
            surname: 'required',
            fax: 'required',
            user_name: 'required',
        },
        messages: {
            company: 'Dieses Feld ist erforderlich',
            address: 'Dieses Feld ist erforderlich',
            e_mail: 'Dieses Feld ist erforderlich',
            number_of_employees: 'Dieses Feld ist erforderlich',
            chief_executive_officer: 'Dieses Feld ist erforderlich',
            postcode: 'Dieses Feld ist erforderlich',
            town: 'Dieses Feld ist erforderlich',
            sphone: 'Dieses Feld ist erforderlich',
            note: 'Dieses Feld ist erforderlich',
            title: 'Dieses Feld ist erforderlich',
            first_name: 'Dieses Feld ist erforderlich',
            email: 'Dieses Feld ist erforderlich',
            phone: 'Dieses Feld ist erforderlich',
            mobile: 'Dieses Feld ist erforderlich',
            password: 'Dieses Feld ist erforderlich',
            confirm_password: {
                required : 'Bestätigen Sie, dass ein Passwort erforderlich ist',
                equalTo : 'Passwort stimmt nicht überein',
            },
            user_role: 'Dieses Feld ist erforderlich',
            surname: 'Dieses Feld ist erforderlich',
            fax: 'Dieses Feld ist erforderlich',
            user_name: 'Dieses Feld ist erforderlich',
        },
    });
    //////////edit super admin form validation 
    $("#edit-super-admin-form").validate({
        rules: {
            company: 'required',
            address: 'required',
            e_mail: {
                required: true,
                email: true,//add an email rule that will ensure the value entered is valid email id.
                maxlength: 255,
            },
            number_of_employees: 'required',
            chief_executive_officer: 'required',
            postcode: 'required',
            town: 'required',
            sphone: 'required',
            note: 'required',
            title: 'required',
            first_name: 'required',
            email: {
                required: true,
                email: true,//add an email rule that will ensure the value entered is valid email id.
                maxlength: 255,
            },
            phone: 'required',
            mobile: 'required',
            user_role: 'required',
            surname: 'required',
            fax: 'required',
            user_name: 'required',
			password: 'required',
            confirm_password: {
                required: true,
                equalTo : "#password",
             },
        },
        messages: {
            company: 'Dieses Feld ist erforderlich',
            address: 'Dieses Feld ist erforderlich',
            e_mail: 'Dieses Feld ist erforderlich',
            number_of_employees: 'Dieses Feld ist erforderlich',
            chief_executive_officer: 'Dieses Feld ist erforderlich',
            postcode: 'Dieses Feld ist erforderlich',
            town: 'Dieses Feld ist erforderlich',
            sphone: 'Dieses Feld ist erforderlich',
            note: 'Dieses Feld ist erforderlich',
            title: 'Dieses Feld ist erforderlich',
            first_name: 'Dieses Feld ist erforderlich',
            email: 'Dieses Feld ist erforderlich',
            phone: 'Dieses Feld ist erforderlich',
            mobile: 'Dieses Feld ist erforderlich',
            user_role: 'Dieses Feld ist erforderlich',
            surname: 'Dieses Feld ist erforderlich',
            fax: 'Dieses Feld ist erforderlich',
            user_name: 'Dieses Feld ist erforderlich',
			password: 'Dieses Feld ist erforderlich',
            confirm_password: {
                required : 'Bestätigen Sie, dass ein Passwort erforderlich ist',
                equalTo : 'Passwort stimmt nicht überein',
            },
        },
    });
    ////////edit-tenant-group form validation
    $("#update-tenant-form").validate({
        rules: {
            surname: 'required',
            abbreviation: 'required',
        },
        messages: {
            surname: 'Dieses Feld ist erforderlich',
            abbreviation: 'Dieses Feld ist erforderlich',
        }
    });
    ////////group form validation
    $("#group-form").validate({
        rules: {
            name: 'required',
            description: 'required',
        },
        messages: {
            name: 'Dieses Feld ist erforderlich',
            description: 'Dieses Feld ist erforderlich',
        }
    });   
    ////////edit-group form validation
    $("#edit-group").validate({
        rules: {
            name: 'required',
            description: 'required',
        },
        messages: {
            name: 'Dieses Feld ist erforderlich',
            description: 'Dieses Feld ist erforderlich',
        }
    });
    ////////menu form validation
    $("#menu-form").validate({
        rules: {
            name: 'required',
        },
        messages: {
            name: 'Dieses Feld ist erforderlich',
        }
    });   
    ////////edit-menu form validation
    $("#edit-menu").validate({
        rules: {
            name: 'required',
        },
        messages: {
            name: 'Dieses Feld ist erforderlich',
        }
    });    
     ////////company form validation
     $("#company-form").validate({
        rules: {
            title: 'required',
            surname: 'required',
            first_name: 'required',
            email: {
                required: true,
                email: true,//add an email rule that will ensure the value entered is valid email id.
                maxlength: 255,
            },
            phone: 'required',
            fax: 'required',
            mobile: 'required',
            user_name: 'required',
            companyName: 'required',
        },
        messages: {
            title: 'Dieses Feld ist erforderlich',
            surname: 'Dieses Feld ist erforderlich',
            first_name: 'Dieses Feld ist erforderlich',
            email: 'Dieses Feld ist erforderlich',
            phone: 'Dieses Feld ist erforderlich',
            fax: 'Dieses Feld ist erforderlich',
            mobile: 'Dieses Feld ist erforderlich',
            user_name: 'Dieses Feld ist erforderlich',
            companyName: 'Dieses Feld ist erforderlich',            
        }
    });    
});