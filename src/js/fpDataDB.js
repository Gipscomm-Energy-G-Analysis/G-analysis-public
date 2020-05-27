
const scpDataDB =
    freeze(
        new function () {

            const Crud =
                { Create : tuple ( 0,"crud_create" )
                , Read   : tuple ( 1,"crud_read" )
                , Update : tuple ( 2,"crud_update" )
                , Delete : tuple ( 3,"crud_delete" )
                }

            const None = {}

            const Task =
                { Crud : tuple ( 0, "task_crud")
                , None : tuple ( -1, "task_none")
                }

            const queryDB =
                url =>
                data =>
                $.ajax(
                    { type : "POST"
                    , url
                    , data
                    }
                );

            const fromFile =
                instance =>
                task => {
                    let msg;
                }
                switch (task) {
                    case (Task.Crud) :
                        msg = `php/${instance}.${taskGeneral}.php`;
                        break;
                    case (Task.Crud) :
                        msg = `php/${instance}.${taskGeneral}.php`;
                        break;
                    default:

                }
                ;

            const withData =
                instance =>
                taskSpecific =>



            const Messmittel =
                client =>
                organization =>
                site => ({
                    read : queryMessmittel ( file.read ),
                    create : queryMessmittel ( file.create ),
                    update : queryMessmittel ( file.update )
                });

            const parData =
                nameDB =>
                orgID =>
                liegID =>
                morePars => {

                    const defaultPars =
                        () =>
                        makeRecord(
                            { nameDB
                            , orgID
                            , liegID
                            }
                        );

                    const addParameters =
                        rec =>
                        par =>
                        addField ( rec ) ( par );

                    const addToDefault =
                        addParameters( defaultPars );

                    return
                        Object
                        .keys( morePars )
                        .reduce( addToDefault )

                }
        }
    )

    function tuple (a, b) {
		let retVal = false;

		switch (fn.name) {
            case "pair":
				tuple_ =
					{ first : a
			  	 	, second : b
              	 	}
				break;
			 case "first":
				retVal =
					tuple_.first
			 case "second":
				retVal =
					tuple_.second
