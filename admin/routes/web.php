<?php
  
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductionController;
use App\Http\Controllers\EvaluationsController; 
use App\Http\Controllers\BaseDataController;
use App\Http\Controllers\ManuallyController;
use App\Http\Controllers\HelpController;
use App\Http\Controllers\OptionsController; 
use App\Http\Controllers\Admin\{AuthController,ProfileController,UserController,PermissionController,AdminController,TenantGroup,SuperAdmin,GroupsController,MenuController,CompanyController,GipscommAdminsController};
Route::get('/', function () {
    return view('home');
});  
Auth::routes();
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/
Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard'); 
Route::get('production', [ProductionController::class, 'production'])->name('production');
Route::get('evaluations', [EvaluationsController::class, 'evaluations'])->name('evaluations'); 
Route::get('basedata', [BaseDataController::class, 'basedata'])->name('basedata');
Route::get('manually', [ManuallyController::class, 'manually'])->name('manually');
Route::get('options', [OptionsController::class, 'options'])->name('options');
Route::get('help', [HelpController::class, 'help'])->name('help');
Route::get('login', [CustomAuthController::class, 'index'])->name('login');
Route::post('custom-login', [CustomAuthController::class, 'customLogin'])->name('login.custom'); 
Route::get('registration', [CustomAuthController::class, 'registration'])->name('registration');
Route::post('custom-registration', [CustomAuthController::class, 'customRegistration'])->name('register.custom'); 
Route::get('signout', [CustomAuthController::class, 'signOut'])->name('signout');
Route::get('/admin/login',[AuthController::class,'getLogin'])->name('getLogin');
Route::post('/admin/login',[AuthController::class,'postLogin'])->name('postLogin');
Route::get('/admin',[AuthController::class,'getLogin'])->name('getLogin');
Route::post('/admin',[AuthController::class,'postLogin'])->name('postLogin');

Route::group(['middleware'=>['admin_auth']],function(){
    
    Route::get('/admin/dashboard',[ProfileController::class,'dashboard'])->name('dashboard');
    Route::get('/admin/logout',[ProfileController::class,'logout'])->name('logout');
    Route::get('/admin/users',[UserController::class,'formDetails'])->name('user-details');
    Route::post('/admin/submit-form',[UserController::class,'submitForm'])->name('submit-form');
    Route::get('/admin/user-details',[UserController::class,'index'])->name('users.index');
    Route::get('/admin/user-permission',[PermissionController::class,'userDetails'])->name('user-permission');
    Route::get('/admin/admins',[AdminController::class,'index'])->name('admin');

    Route::get('/admin/tenant-group',[TenantGroup::class,'index'])->name('tenant-group');
    Route::post('/admin/tenant-group-form',[TenantGroup::class,'tenantGroupForm'])->name('tenant-group-form');
    Route::get('/admin/edit-tenant-group/{id}',[TenantGroup::class,'editTenantGroup'])->name('edit-tenant-group');
    Route::get('/admin/tenant-group-list',[TenantGroup::class,'tenantGroupList'])->name('tenant-group-list');
    Route::post('/admin/update-tenant-group-form',[TenantGroup::class,'updateTenantGroupForm'])->name('update-tenant-group-form');
    Route::get('/admin/delete-tenant-group/{id}',[TenantGroup::class,'delete'])->name('delete');
    
    Route::get('/admin/super-admin',[SuperAdmin::class,'index'])->name('super-admin');
    Route::post('/admin/super-admin-form',[SuperAdmin::class,'superAdminForm'])->name('super-admin-form');
    Route::get('/admin/edit-super-admin/{id}',[SuperAdmin::class,'editSuperAdmin'])->name('edit-super-admin');
    Route::post('/admin/update-super-admin-form',[SuperAdmin::class,'updateSuperAdminForm'])->name('update-super-admin-form');
    Route::get('/admin/delete-super-admin/{id}',[SuperAdmin::class,'deleteSuperAdmin'])->name('delete-super-admin');

    Route::get('/admin/create-group-form',[GroupsController::class,'index'])->name('createGroupForm');
    Route::post('/admin/create-group-form',[GroupsController::class,'createGroupForm'])->name('create-group-form');
    Route::get('/admin/edit-group/{id}',[GroupsController::class,'editGroup'])->name('edit-group');
    Route::post('/admin/update-group',[GroupsController::class,'updateGroup'])->name('update-group');
    Route::get('/admin/group-list',[GroupsController::class,'groupList'])->name('group-list');
    Route::get('/admin/delete-group/{id}',[GroupsController::class,'deleteGroup'])->name('delete-group');
    Route::get('/admin/getGroupPermissionMenu',[GroupsController::class,'getGroupPermissionMenu'])->name('getGroupPermissionMenu');

    Route::get('/admin/menu-form',[MenuController::class,'index'])->name('menuForm');
    Route::post('/admin/create-menu-form',[MenuController::class,'createmenuForm'])->name('create-menu-form');
    Route::get('/admin/edit-menu/{id}',[MenuController::class,'editMenu'])->name('edit-menu');
    Route::post('/admin/update-menu',[MenuController::class,'updateMenu'])->name('update-menu');
    Route::get('/admin/menu-list',[MenuController::class,'menuList'])->name('menu-list');
    Route::get('/admin/delete-menu/{id}',[MenuController::class,'deleteMenu'])->name('delete-menu');

    Route::get('/admin/company-form',[CompanyController::class,'index'])->name('companyForm');
    Route::post('/admin/create-company-form',[CompanyController::class,'createCompanyForm'])->name('create-company-form');
    Route::get('/admin/companies-list',[CompanyController::class,'companiesList'])->name('companies-list');

    Route::get('/admin/edit/{id}/{role}',[UserController::class,'edit'])->name('edit');
    Route::post('/admin/update',[UserController::class,'update'])->name('update');
    Route::get('/admin/delete/{id}/{role}',[UserController::class,'delete'])->name('delete');

    Route::get('/admin/gipscomm-admins-list',[GipscommAdminsController::class,'gipscommAdminsList'])->name('gipscomm-admins-list');

    //Menu permission route
    Route::get('/admin/menu/permission',[UserController::class,'getPermissionMenu'])->name('getPermissionMenu');
    Route::get('/admin/betreuergruppen',[UserController::class,'getBetreuerGruppen'])->name('getBetreuerGruppen');
});

