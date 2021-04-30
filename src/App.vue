<template>
  <div id="app">
    <!-- <div id="nav">
      <span>
        <router-link to="/">Home</router-link>
        |
      </span>
      <span>
        <router-link to="/about">About</router-link>
        |
      </span>
      <span v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link>
        |
      </span>
      <span v-if="!isLoggedIn()">
        <router-link to="/login">Login</router-link>
        |
      </span>
      <span v-if="isLoggedIn()">
        <router-link to="/groups">Groups</router-link>
        |
      </span>
      <span v-if="isLoggedIn()">
        <router-link to="/logout">Logout</router-link>
        |
      </span>
    </div> -->

    <div id="wrapper">
      <!-- Sidebar -->
      <ul
        v-if="isLoggedIn()"
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
          <!-- <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div> -->
          <div class="sidebar-brand-text mx-3">Funny Money</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
          <a class="nav-link" href="/">
            <i class="fas fa-folder" aria-hidden="true"></i>
            <span>My Portfolio</span>
          </a>
        </li>

        <li class="nav-item active">
          <a class="nav-link" href="/transactions/new">
            <i class="fas fa-plus-circle" aria-hidden="true"></i>
            <span>Add Transaction</span>
          </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <!-- <div class="sidebar-heading">Groups</div> -->

        <!-- Nav Item - Pages Collapse Menu -->
        <!-- <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i class="fas fa-fw fa-cog"></i>
            <span>Components</span>
          </a>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Custom Components:</h6>
              <a class="collapse-item" href="buttons.html">Buttons</a>
              <a class="collapse-item" href="cards.html">Cards</a>
            </div>
          </div>
        </li> -->
        <!-- GROUPS NAV SECTION -->
        <li class="nav-item active">
          <a class="nav-link" href="/groups">
            <i class="fas fa-users" aria-hidden="true"></i>
            <span>My Groups</span>
          </a>
        </li>

        <!-- Nav Item - Utilities Collapse Menu -->
        <!-- <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i class="fas fa-fw fa-wrench"></i>
            <span>Utilities</span>
          </a>
          <div
            id="collapseUtilities"
            class="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Custom Utilities:</h6>
              <a class="collapse-item" href="utilities-color.html">Colors</a>
              <a class="collapse-item" href="utilities-border.html">Borders</a>
              <a class="collapse-item" href="utilities-animation.html">Animations</a>
              <a class="collapse-item" href="utilities-other.html">Other</a>
            </div>
          </div>
        </li> -->

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <!-- <div class="sidebar-heading">Addons</div> -->

        <!-- Nav Item - Pages Collapse Menu -->
        <!-- <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i class="fas fa-fw fa-folder"></i>
            <span>Pages</span>
          </a>
          <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Login Screens:</h6>
              <a class="collapse-item" href="login.html">Login</a>
              <a class="collapse-item" href="register.html">Register</a>
              <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
              <div class="collapse-divider"></div>
              <h6 class="collapse-header">Other Pages:</h6>
              <a class="collapse-item" href="404.html">404 Page</a>
              <a class="collapse-item" href="blank.html">Blank Page</a>
            </div>
          </div>
        </li> -->

        <!-- Nav Item - Charts -->
        <!-- <li class="nav-item">
          <a class="nav-link" href="charts.html">
            <i class="fas fa-fw fa-chart-area"></i>
            <span>Charts</span>
          </a>
        </li> -->

        <!-- Nav Item - Tables -->
        <!-- <li class="nav-item">
          <a class="nav-link" href="tables.html">
            <i class="fas fa-fw fa-table"></i>
            <span>Tables</span>
          </a>
        </li> -->

        <!-- Divider -->
        <!-- <hr class="sidebar-divider d-none d-md-block" /> -->

        <!-- Sidebar Toggler (Sidebar) -->
        <!-- <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div> -->

        <!-- Sidebar Message -->
        <!-- <div class="sidebar-card">
          <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="" />
          <p class="text-center mb-2">
            <strong>SB Admin Pro</strong>
            is packed with premium features, components, and more!
          </p>
          <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
        </div> -->
      </ul>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <nav v-if="isLoggedIn()" class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <!-- Sidebar Toggle (Topbar) -->
            <!-- <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
              <i class="fa fa-bars"></i>
            </button> -->

            <!-- Topbar Search -->
            <!-- <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form> -->

            <!-- Topbar Navbar -->
            <ul class="navbar-nav ml-auto">
              <!-- Nav Item - Search Dropdown (Visible Only XS) -->
              <li class="nav-item dropdown no-arrow d-sm-none">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-search fa-fw"></i>
                </a>
                <!-- Dropdown - Messages -->
                <div
                  class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form class="form-inline mr-auto w-100 navbar-search">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div class="input-group-append">
                        <button class="btn btn-primary" type="button">
                          <i class="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>

              <div class="topbar-divider d-none d-sm-block"></div>

              <!-- Nav Item - User Information -->
              <li class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">Profile</span>
                  <img class="img-profile rounded-circle" src="img/undraw_profile.svg" />
                </a>
                <!-- Dropdown - User Information -->
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <!-- <a class="dropdown-item" href="#">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                  </a>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </a>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                  </a> -->
                  <!-- <div class="dropdown-divider"></div> -->
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <div class="container-fluid">
            <router-view />
            <!-- Page Heading -->
            <!-- <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">Portfolio</h1>
            </div> -->

            <!-- Content Row -->
            <div class="row"></div>
          </div>
        </div>
        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Funny Money 2021</span>
              <br />
              <br />
              <span>Created by Sam Tanner with direct inspiration from Eugene Cheng's Share My Stocks idea.</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" v-on:click="logout()" href="/login">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      // username: localStorage.getItem("username"),
      username: "Profile",
      user_info: {},
    };
  },
  mounted: function () {
    // this.showUserInfo();
  },
  methods: {
    showUserInfo: function () {
      axios.get("/api/users/" + localStorage.getItem("user_id")).then((response) => {
        console.log(response.data);
        this.user_info = response.data;
      });
    },
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    getUsername: function () {
      // this.username = localStorage.getItem("username");
      return localStorage.getItem("username");
    },
    logout: function () {
      this.$router.push("/logout");
    },
  },
};
</script>
