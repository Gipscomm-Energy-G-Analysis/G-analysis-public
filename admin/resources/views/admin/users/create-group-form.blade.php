      @extends('admin.main-layout')

      @section('content-header')

      <div class="content-header">
          <div class="container-fluid">
              <div class="row mb-2">
                  <div class="col-sm-6">
                      <h1 class="m-0">{{ __('groups.mainEditHeading') }}</h1>
                  </div><!-- /.col -->
                  <div class="col-sm-6">
                      <ol class="breadcrumb float-sm-right">
                          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('groups.breadcrumb') }}</a></li>
                          <li class="breadcrumb-item active">{{ __('groups.mainEditHeading') }}</li>
                      </ol>
                  </div><!-- /.col -->
              </div><!-- /.row -->
          </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
      @endsection
      @section('body')

      <!-- Main row -->
      <section class="main-sec-blade">
          <div class="row">
              <div class="container-fluid">
                  <!-- Add User -->
                  <form action="{{route('create-group-form')}}" method="post" id="group-form">
                      @csrf

                      <div class="card card-secondary">
                          <div class="card-header">
                              <h3 class="card-title">{{ __('groups.mainEditHeading') }}</h3>
                          </div>

                          <div class="card-body p-0">
                              <div class="main-box-blade p-3">
                                  <div class="row">
                                      <div class="col-sm-6">

                                          <div class="form-group">
                                              <label>{{ __('groups.Name') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('groups.Name') }}" id="name"
                                                  name="name" value="{{ old('name') }}">
                                              @error('name')
                                              <label id="name-error" class="error" for="name">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                      <div class="col-sm-6">
                                          <div class="form-group">
                                              <label>{{ __('groups.Description') }}</label>
                                              <textarea id="description" placeholder="{{ __('groups.Description') }}" class="form-control"
                                                  rows="1" name="description">{{ old('description') }}</textarea>
                                              @error('description')
                                              <label id="description-error" class="error"
                                                  for="description">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="card card-secondary">
                                  <div class="card-header">
                                      <h3 class="card-title">{{ __('groups.rolesAndPermissions') }}</h3>

                                  </div>
                                  <div class="card-body">
                                      <div class="tree">
                                          <!-- treeview wrapper -->
                                          <ul class="treeview"></ul>
                                      </div>
                                      <input class="role-permission-ids" type="hidden"
                                          value="{{ old('rolePermissionIds') }}" name="rolePermissionIds">
                                      <input class="role-permission-addIds" type="hidden"
                                          value="{{ old('rolePermissionAddIds') }}" name="rolePermissionAddIds">
                                      <input class="role-permission-editIds" type="hidden"
                                          value="{{ old('rolePermissionEditIds') }}" name="rolePermissionEditIds">
                                      <input class="role-permission-deleteIds" type="hidden"
                                          value="{{ old('rolePermissionDeleteIds') }}" name="rolePermissionDeleteIds">
                                  </div>
                              </div>
                          </div>
                          <div class="card-sec-submit d-flex justify-content-end">
                              <a href="{{ route('group-list') }}"><button type="button"
                                      class="btn btn-default mr-2">{{ __('groups.cancel') }}</button></a>
                              <button type="submit" class="btn btn-secondary save-group float-right">{{ __('groups.submit') }}</button>
                          </div>
                      </div>

                  </form>

              </div>
          </div>
      </section>
      <!-- /.row (main row) -->
      <!-- plugin -->
      <script src="{{asset('admin-assets/js/jquery.artaraxtreeview.js')}}"></script>
      <script>
function treeViewData() {
    var treeViewData = @json($groupMenuPermission);
    return treeViewData;
}
var selectedItemIds = [7, 8, 9];

// set settings
var artaraxTreeView = $.artaraxTreeView({
    jsonData: treeViewData(),
    selectedIds: selectedItemIds, // just use on update mode (when you run tree view by 'loadTreeViewOnUpdate()' function)
    // addCallBack: onAdd,
    // updateCallBack: onUpdate,
    // deleteCallBack: onDelete,
    isDisplayChildren: false
    // ,isDisplayChildren: false // use this to collapse all nodes on load (it works just on insert mode, when you run tree view by 'loadTreeViewOnInsert()' function)
});
// load treeview
artaraxTreeView.loadTreeViewOnInsert("#"); // 1 is the root id
// use above line on insert mode, for update mode use below line
// artaraxTreeView.loadTreeViewOnUpdate(1);
$(".save-group").click(function() {
    var selectedIds = artaraxTreeView.getSelectedIds();
    $(".role-permission-ids").val(selectedIds);
    var addSelectedIds = artaraxTreeView.getAddSelectedIds();
    $(".role-permission-addIds").val(addSelectedIds);
    var editSelectedIds = artaraxTreeView.getEditSelectedIds();
    $(".role-permission-editIds").val(editSelectedIds);
    var deleteSelectedIds = artaraxTreeView.getDeleteSelectedIds();
    $(".role-permission-deleteIds").val(deleteSelectedIds);
});

function onAdd(obj) {
    // save data into db here
    alert('onAdd executed >> selected object is >>' + JSON.stringify(obj));
}

function onUpdate(obj) {
    // save data into db here
    alert('onUpdate executed >> selected object is >>' + JSON.stringify(obj));
}

function onDelete(obj) {
    // save data into db here
    alert('onDelete executed >> selected object is >>' + JSON.stringify(obj));
}
      </script>
      @endsection