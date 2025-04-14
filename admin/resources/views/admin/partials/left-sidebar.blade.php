  @php
  $current_route=request()->route()->getName();
  @endphp
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="{{route('dashboard')}}" class="brand-link mt-4">
          <img src="{{asset('admin-assets/dist/img/AdminLTELogo.png')}}" alt="AdminLTE Logo"
              class="brand-image g-ana-logo w-50  " style="opacity: .8">

      </a>

      <!-- Sidebar -->
      <div class="sidebar">
          <!-- Sidebar user panel (optional) -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                  <img src="{{asset('admin-assets/dist/img/user2-160x160.jpg')}}" class="img-circle elevation-2"
                      alt="User Image">
              </div>
              <div class="info">
                  <a href="#" class="d-block">{{auth()->user()->name}}</a>
              </div>
          </div>

          <!-- SidebarSearch Form -->
          <div class="form-inline">
              <div class="input-group" data-widget="sidebar-search">
                  <input class="form-control form-control-sidebar" type="search" placeholder="{{ __('left-sidebar.Search') }}"
                      aria-label="Search">
                  <div class="input-group-append">
                      <button class="btn btn-sidebar">
                          <i class="fas fa-search fa-fw"></i>
                      </button>
                  </div>
              </div>
          </div>

          <!-- Sidebar Menu -->
          <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                  data-accordion="false">
                  <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->

                  <li class="nav-item">
                      <a href="{{route('dashboard')}}" class="nav-link {{$current_route=='dashboard'?'active':''}}">
                          <i class="nav-icon fas fa-tachometer-alt"></i>
                          <p>
                            {{ __('left-sidebar.Dashboard') }}
                          </p>
                      </a>
                  </li>
                  <!-- <li class="nav-item {{($current_route=='users.index') || ($current_route=='admin') || ($current_route=='tenant-group') || ($current_route=='super-admin')?'menu-open':''}}">
            <a href="#" class="nav-link {{($current_route=='users.index') || ($current_route=='admin') || ($current_route=='tenant-group') || ($current_route=='super-admin')?'active':''}}">
              <i class="nav-icon fas fa-users"></i>
              <p>
                User Management
                <i class="right fas fa-angle-left"></i>
              </p>
            </a> -->
                  <li
                      class="nav-item {{($current_route=='users.index') || ($current_route=='user-details') ?'menu-open':''}}">
                      <a href="#"
                          class="nav-link {{($current_route=='users.index') || ($current_route=='user-details') ?'active':''}}">
                          <i class="nav-icon fas fa-users"></i>
                          <p>
                            {{ __('left-sidebar.UserManagement') }}
                              <i class="right fas fa-angle-left"></i>
                          </p>
                      </a>
                      <ul class="nav nav-treeview">
                          <li class="nav-item">
                              <a href="{{route('user-details')}}"
                                  class="nav-link {{$current_route=='user-details'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.Users') }}</p>
                              </a>
                          </li>

                          <li class="nav-item">
                              <a href="{{route('users.index')}}"
                                  class="nav-link {{$current_route=='users.index'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.AddUser') }}</p>
                              </a>
                          </li>

                      </ul>
                  </li>

                  <!-- <li class="nav-item">
                <a href="{{route('admin')}}" class="nav-link {{$current_route=='admin'?'active':''}}">
                  <i class="far fas fa-book"></i>
                  <p>Admin</p>
                </a>
              </li> -->

                  <li
                      class="nav-item {{($current_route=='tenant-group') || ($current_route=='tenant-group-list') ?'menu-open':''}}">
                      <a href="#"
                          class="nav-link {{($current_route=='tenant-group') || ($current_route=='tenant-group-list') ?'active':''}}">
                          <i class="nav-icon far fas fa-copy"></i>
                          <p>
                            {{ __('left-sidebar.TenantGroups') }}
                              <i class="right fas fa-angle-left"></i>
                          </p>
                      </a>
                      <ul class="nav nav-treeview">
                          <li class="nav-item">
                              <a href="{{route('tenant-group-list')}}"
                                  class="nav-link {{$current_route=='tenant-group-list'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.TenantGroupsListing') }}</p>
                              </a>
                          </li>

                          <li class="nav-item">
                              <a href="{{route('tenant-group')}}"
                                  class="nav-link {{$current_route=='tenant-group'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.AddTenantGroup') }}</p>
                              </a>
                          </li>

                      </ul>
                  </li>

                  <li class="nav-item">
                      <a href="{{route('super-admin')}}" class="nav-link {{$current_route=='super-admin'?'active':''}}">
                          <i class="nav-icon far fas fa-th"></i>
                          <p>{{ __('left-sidebar.SupervisorGroups') }}</p>
                          <p class="admin-mar">{{ __('left-sidebar.SuperAdmins') }}</p>
                      </a>
                  </li>

                  <li class="nav-item">
                      <a href="{{route('gipscomm-admins-list')}}" class="nav-link {{$current_route=='gipscomm-admins-list'?'active':''}}">
                          <i class="nav-icon far fas fa-tree"></i>
                          <p>{{ __('left-sidebar.GipscommAdmins') }}</p>
                          <p class="admin-mar">{{ __('left-sidebar.Listing') }}</p>
                      </a>
                  </li>

                  <li
                      class="nav-item {{($current_route=='createGroupForm') || ($current_route=='group-list') ?'menu-open':''}}">
                      <a href="#"
                          class="nav-link {{($current_route=='createGroupForm') || ($current_route=='group-list') ?'active':''}}">
                          <i class="nav-icon fas fa-book"></i>
                          <p>
                          {{ __('left-sidebar.Groups') }}
                              <i class="right fas fa-angle-left"></i>
                          </p>
                      </a>
                      <ul class="nav nav-treeview">
                          <li class="nav-item">
                              <a href="{{route('group-list')}}"
                                  class="nav-link {{$current_route=='group-list'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.GroupsListing') }}</p>
                              </a>
                          </li>

                          <li class="nav-item">
                              <a href="{{route('createGroupForm')}}"
                                  class="nav-link {{$current_route=='createGroupForm'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.AddGroup') }}</p>
                              </a>
                          </li>

                      </ul>
                  </li>

                  <li
                      class="nav-item {{($current_route=='menuForm') || ($current_route=='menu-list') ?'menu-open':''}}">
                      <a href="#"
                          class="nav-link {{($current_route=='menuForm') || ($current_route=='menu-list') ?'active':''}}">
                          <i class="nav-icon far fa-plus-square"></i>
                          <p>
                          {{ __('left-sidebar.Menus') }}
                              <i class="right fas fa-angle-left"></i>
                          </p>
                      </a>
                      <ul class="nav nav-treeview">
                          <li class="nav-item">
                              <a href="{{route('menu-list')}}"
                                  class="nav-link {{$current_route=='menu-list'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.MenusListing') }}</p>
                              </a>
                          </li>

                          <li class="nav-item">
                              <a href="{{route('menuForm')}}"
                                  class="nav-link {{$current_route=='menuForm'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.AddMenu') }}</p>
                              </a>
                          </li>

                      </ul>
                  </li>

                  <li class="nav-item {{($current_route=='companyForm') || ($current_route=='companies-list') ?'menu-open':''}}">
                      <a href="#" class="nav-link {{($current_route=='companyForm') || ($current_route=='companies-list') ?'active':''}}">
                          <i class="nav-icon fas fa-table"></i>
                          <p>
                          {{ __('left-sidebar.Companies') }}
                              <i class="right fas fa-angle-left"></i>
                          </p>
                      </a>
                      <ul class="nav nav-treeview">
                          <li class="nav-item">
                              <a href="{{route('companies-list')}}"
                                  class="nav-link {{$current_route=='companies-list'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.CompanyListing') }}</p>
                              </a>
                          </li>
                          <li class="nav-item">
                              <a href="{{route('companyForm')}}"
                                  class="nav-link {{$current_route=='companyForm'?'active':''}}">
                                  <i class="nav-icon far fa-circle"></i>
                                  <p>{{ __('left-sidebar.AddCompany') }}</p>
                              </a>
                          </li>

                      </ul>
                  </li>

                  <li class="nav-item {{$current_route=='user-permission.index'?'menu-open':''}}">
                      <a href="{{route('user-permission')}}"
                          class="nav-link {{$current_route=='user-permission'?'active':''}}">
                          <i class="nav-icon fas fa-edit"></i>
                          <p>
                          {{ __('left-sidebar.Permission') }}
                          </p>
                      </a>
                  </li>

              </ul>
          </nav>
          <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
  </aside>