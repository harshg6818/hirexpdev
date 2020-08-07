<template>
  <nav class="top-nav">
    <div class="nav-items">
      <ul>
      <li>
        <div class="top-menu"
          :class="activeDashView === 'overview' ? 'top-menu--active' : ''"
          @click="activeDashView = 'overview';"
        >
          <div class="top-menu__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <div class="top-menu__title"> Overview </div>
        </div>
      </li>
      <li>
        <div class="top-menu"
          :class="activeDashView === 'touchpoints-snapshot'
            || activeDashView === 'touchpoints-analysis' ? 'top-menu--active' : 'menu'"
        >
          <div class="top-menu__icon">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-activity">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg> -->
            <v-icon color="#000">fas fa-bezier-curve</v-icon>
          </div>
          <div class="top-menu__title"> Critical touchpoints
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down top-menu__sub-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
        <ul class="dropdown">
          <li>
              <div @click="activeDashView = 'touchpoints-snapshot';" class="top-menu-side">
                  <div class="top-menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg> </div>
                  <div class="top-menu__title">Snapshot</div>
              </div>
          </li>
          <li>
              <div @click="activeDashView = 'touchpoints-analysis';" class="top-menu-side">
                  <div class="top-menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg> </div>
                  <div class="top-menu__title">Touchpoint analysis</div>
              </div>
          </li>
        </ul>
      </li>
      <li>
        <div class="top-menu"
          :class="activeDashView === 'disengaged-snapshot'
            || activeDashView === 'disengaged-emp-to-meet'
            || activeDashView === 'disengaged-sentiment-analysis'
            ? 'top-menu--active' : 'menu'"
        >
        <div class="top-menu__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
          </div>
          <div class="top-menu__title">
            Disengaged employees
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down top-menu__sub-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
        <ul class="dropdown">
          <li>
              <div @click="activeDashView = 'disengaged-snapshot';" class="top-menu-side">
                  <div class="top-menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg> </div>
                  <div class="top-menu__title">Snapshot</div>
              </div>
          </li>
          <li>
              <div @click="activeDashView = 'disengaged-emp-to-meet';" class="top-menu-side">
                  <div class="top-menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg> </div>
                  <div class="top-menu__title">Employees to meet</div>
              </div>
          </li>
          <li>
              <div @click="activeDashView = 'disengaged-sentiment-analysis';" class="top-menu-side">
                  <div class="top-menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg> </div>
                  <div class="top-menu__title">Sentiment analysis</div>
              </div>
          </li>
        </ul>
      </li>
      <li>
        <div class="top-menu"
          :class="activeDashView === 'txt-analysis' ? 'top-menu--active' : ''"
          @click="activeDashView = 'txt-analysis';"
        >
        <div class="top-menu__icon">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg> -->
              <v-icon color="#000">fab fa-searchengin</v-icon>
          </div>
          <div class="top-menu__title">Txt analysis</div>
        </div>
      </li>
      <li>
        <div class="top-menu"
          :class="activeDashView === 'anonymous-snapshot'
          || activeDashView === 'anonymous-message'
          ? 'top-menu--active' : ''"
        >
        <div class="top-menu__icon">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg> -->
                      <v-icon color="#000">fas fa-user-secret</v-icon>
          </div>
          <div class="top-menu__title">
            Anonymous
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down top-menu__sub-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
        <ul class="dropdown">
          <li>
            <div @click="activeDashView = 'anonymous-snapshot'" class="top-menu-side">
              <div class="top-menu__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                  height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-activity">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div class="top-menu__title">Snapshot</div>
            </div>
          </li>
          <li>
              <div @click="activeDashView = 'anonymous-message'" class="top-menu-side">
                  <div class="top-menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-activity">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg> </div>
                  <div class="top-menu__title">Messages</div>
              </div>
          </li>
        </ul>
      </li>
    </ul>
    </div>
    <div class="filter-bar"
      v-if="activeDashView !== 'anonymous-snapshot'
        && activeDashView !== 'anonymous-message'"
    >
      <v-btn
        slot="activator"
        class="box-container zoom-in"
        @click.stop="toggleDashFilter"
      >
        <v-icon small>fas fa-filter</v-icon>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>Filter</span>
      </v-btn>
      <v-btn
        class="box-container zoom-in"
        v-if="isFilterApplied"
        @click="resetDashFilters"
      >
        Remove Filters
      </v-btn>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DashboardTopBar',

  components: {
  },

  props: {
    isFilterApplied: {
      required: true,
      type: Boolean
    },
    dashTab: {
      required: true,
      type: String,
      default: ''
    }
  },

  data () {
    return {
      activeDashView: ''
    };
  },

  watch: {
    activeDashView: {
      immediate: false,
      handler () {
        this.$router.replace({ path: '/', query: { tab: this.activeDashView } });
      }
    },
    $route: {
      deep: true,
      handler () {
        if (this.$route.query) {
          if (this.$route.query.tab) {
            this.activeDashView = this.$route.query.tab;
          }
        }
      }
    },
    dashTab () {
      this.activeDashView = this.dashTab;
    }
  },

  beforeMount () {
    if (this.$route.query) {
      if (this.$route.query.tab) {
        this.activeDashView = this.$route.query.tab;
      } else {
        this.activeDashView = 'overview';
      }
    }
  },

  computed: {
    ...mapState({
      user: state => state.user
    })
  },

  methods: {
    toggleDashFilter () {
      this.$emit('toggleDashFilter');
    },
    resetDashFilters () {
      this.$emit('resetDashFilters');
    }
  }
};
</script>

<style lang="scss" scoped>
.top-nav {
  display: grid;
  grid-template-columns: 2fr 1fr;
  position: relative;
  ul {
    padding: 0px 50px !important;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      position: relative;
      a {
        text-decoration: none;
      }
      .top-menu {
        height: 55px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        display: flex;
        align-items: center;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        margin-right: 0.25rem;
        color: var(--color-text);
        font-size: var(--heading-size);
        position: relative;
        .top-menu__title {
          margin-left: 0.75rem;
          display: flex;
          align-items: center;
          white-space: nowrap;
          cursor: pointer;
          .top-menu__sub-icon {
            transition-property: background-color,
              border-color, color, fill, stroke, opacity, box-shadow, transform;
            transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
            transition-duration: 100ms;
            width: 1rem;
            height: 1rem;
            margin-left: 0.5rem;
          }
        }
        &.top-menu--active {
          background-color: var(--bg-panel);
          animation: 0.4s intro-active-menu-animation ease-in-out 0.33333s;
          animation-fill-mode: forwards;
          :before {
            content: "";
            width: 20px;
            height: 20px;
            margin-left: -20px;
            transform: rotate(90deg) scale(1.04);
            background-size: 100%;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='259.51' height='259.52' viewBox='0 0 259.51 259.52'%3E%3Cpath id='Path_143' data-name='Path 143' d='M8659.507,423.965c-.167-2.608.05-5.319-.19-8.211-.084-1.012-.031-2.15-.118-3.12-.113-1.25-.1-2.682-.236-4.061-.172-1.722-.179-3.757-.365-5.394-.328-2.889-.478-5.857-.854-8.61-.509-3.714-.825-7.252-1.38-10.543-.934-5.535-2.009-11.312-3.189-16.692-.855-3.9-1.772-7.416-2.752-11.2-1.1-4.256-2.394-8.149-3.687-12.381-1.1-3.615-2.366-6.893-3.623-10.493-1.3-3.739-2.917-7.26-4.284-10.7-1.708-4.295-3.674-8.078-5.485-12.023-1.145-2.493-2.5-4.932-3.727-7.387-1.318-2.646-2.9-5.214-4.152-7.518-1.716-3.16-3.517-5.946-5.274-8.873-1.692-2.818-3.589-5.645-5.355-8.334-2.326-3.542-4.637-6.581-7.039-9.848-2.064-2.809-4.017-5.255-6.088-7.828-2.394-2.974-4.937-5.936-7.292-8.589-3.027-3.411-6.049-6.744-9.055-9.763-2.4-2.412-4.776-4.822-7.108-6.975-3-2.767-5.836-5.471-8.692-7.854-3.332-2.779-6.657-5.663-9.815-8.028-2.958-2.216-5.784-4.613-8.7-6.6-3.161-2.159-6.251-4.414-9.219-6.254-3.814-2.365-7.533-4.882-11.168-6.89-4.213-2.327-8.513-4.909-12.478-6.834-4.61-2.239-9.234-4.619-13.51-6.416-4.1-1.725-8.11-3.505-11.874-4.888-4.5-1.652-8.506-3.191-12.584-4.47-6.045-1.9-12.071-3.678-17.431-5-9.228-2.284-17.608-3.757-24.951-4.9-7.123-1.112-13.437-1.64-18.271-2.035l-2.405-.2c-1.638-.136-3.508-.237-4.633-.3a115.051,115.051,0,0,0-12.526-.227h259.51Z' transform='translate(-8399.997 -164.445)' fill='%23f1f5f8'/%3E%3C/svg%3E%0A");
            position: absolute;
            bottom: 0;
            left: 0;
          }
          :after {
            content: "";
            width: 20px;
            height: 20px;
            margin-right: -20px;
            transform: rotate(180deg) scale(1.04);
            background-size: 100%;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='259.51' height='259.52' viewBox='0 0 259.51 259.52'%3E%3Cpath id='Path_143' data-name='Path 143' d='M8659.507,423.965c-.167-2.608.05-5.319-.19-8.211-.084-1.012-.031-2.15-.118-3.12-.113-1.25-.1-2.682-.236-4.061-.172-1.722-.179-3.757-.365-5.394-.328-2.889-.478-5.857-.854-8.61-.509-3.714-.825-7.252-1.38-10.543-.934-5.535-2.009-11.312-3.189-16.692-.855-3.9-1.772-7.416-2.752-11.2-1.1-4.256-2.394-8.149-3.687-12.381-1.1-3.615-2.366-6.893-3.623-10.493-1.3-3.739-2.917-7.26-4.284-10.7-1.708-4.295-3.674-8.078-5.485-12.023-1.145-2.493-2.5-4.932-3.727-7.387-1.318-2.646-2.9-5.214-4.152-7.518-1.716-3.16-3.517-5.946-5.274-8.873-1.692-2.818-3.589-5.645-5.355-8.334-2.326-3.542-4.637-6.581-7.039-9.848-2.064-2.809-4.017-5.255-6.088-7.828-2.394-2.974-4.937-5.936-7.292-8.589-3.027-3.411-6.049-6.744-9.055-9.763-2.4-2.412-4.776-4.822-7.108-6.975-3-2.767-5.836-5.471-8.692-7.854-3.332-2.779-6.657-5.663-9.815-8.028-2.958-2.216-5.784-4.613-8.7-6.6-3.161-2.159-6.251-4.414-9.219-6.254-3.814-2.365-7.533-4.882-11.168-6.89-4.213-2.327-8.513-4.909-12.478-6.834-4.61-2.239-9.234-4.619-13.51-6.416-4.1-1.725-8.11-3.505-11.874-4.888-4.5-1.652-8.506-3.191-12.584-4.47-6.045-1.9-12.071-3.678-17.431-5-9.228-2.284-17.608-3.757-24.951-4.9-7.123-1.112-13.437-1.64-18.271-2.035l-2.405-.2c-1.638-.136-3.508-.237-4.633-.3a115.051,115.051,0,0,0-12.526-.227h259.51Z' transform='translate(-8399.997 -164.445)' fill='%23f1f5f8'/%3E%3C/svg%3E%0A");
            position: absolute;
            bottom: 0;
            right: 0;
          }
          .top-menu__icon {
            // color: #2e51bb;
            color: var(--primary-dark);;
            svg {
              display: block;
              // vertical-align: middle;
            }
          }
          .top-menu__title {
            color: var(--color-headings);
            font-weight: var(--heading-weight);
          }
        }
        &:not(.top-menu--active) {
          opacity: 0;
          transform: translateY(50px);
          animation: 0.4s intro-menu-animation ease-in-out 0.33333s;
          animation-fill-mode: forwards;
          animation-delay: 0.2s;
        }
        &:not(.top-menu--active) .top-menu__icon:before {
          content: "";
          z-index: -1;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          transition-property: background-color,
            border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
          transition-duration: 100ms;
        }
      }
      @keyframes intro-active-menu-animation {
        100% {
          z-index: 0;
        }
      }
      @keyframes intro-menu-animation {
        100% {
          opacity: 1;
          transform: translateX(0px);
        }
      }
      &:hover .top-menu:not(.top-menu--active) .top-menu__icon:before {
        background-color: var(--bg-panel);
      }
      &:hover .dropdown {
        display: block;
      }
      &:hover .top-menu .top-menu__title .top-menu__sub-icon {
        // --transform-translate-x: 0;
        // --transform-translate-y: 0;
        // --transform-rotate: 0;
        // --transform-skew-x: 0;
        // --transform-skew-y: 0;
        // --transform-scale-x: 1;
        // --transform-scale-y: 1;
        // transform: translateX(var(--transform-translate-x))
        //   translateY(var(--transform-translate-y))
        //   rotate(var(--transform-rotate))
        //   skewX(var(--transform-skew-x))
        //   skewY(var(--transform-skew-y))
        //   scaleX(var(--transform-scale-x))
        //   scaleY(var(--transform-scale-y));
        // --transform-rotate: -90deg;
      }
      .dropdown {
        // list-style: none;
        // margin: 0;
        // padding: 1.25rem !important;
        // left: 100%;
        // margin-left: -4px;
        // background-color: var(--primary-dark);
        // box-shadow: 0px 3px 20px #0000000b;
        // display: none;
        // width: 100%;
        // position: absolute;
        // border-radius: 0.375rem;
        // z-index: 20;
        // top: 0;
        // margin-top: -0.525rem;
        list-style: none;
        margin: 0;
        padding: 1.25rem!important;
        /* left: 100%; */
        // margin-left: -4px;
        background-color: var(--primary-dark);
        -webkit-box-shadow: 0 3px 20px rgba(0,0,0,.04);
        box-shadow: 0 3px 20px rgba(0,0,0,.04);
        display: none;
        width: 100%;
        position: absolute;
        border-radius: .375rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        z-index: 20;
        /* top: 0; */
        /* bottom: 0; */
        li {
          position: relative;
          .top-menu-side {
            height: 55px;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            display: flex;
            align-items: center;
            padding-left: 0;
            padding-right: 0;
            margin-right: 0;
            --text-opacity: 1;
            color: #fff;
            color: rgba(255, 255, 255, var(--text-opacity));
            position: relative;
            width: 100%;
            padding-left: 1.25rem !important;
            .top-menu__title {
              width: 100%;
              margin-left: 0.75rem;
              display: flex;
              align-items: center;
              white-space: nowrap;
            }
            .top-menu__icon:before {
              content: "";
              z-index: -1;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              border-radius: 0.5rem;
              transition-property: background-color,
                border-color, color, fill, stroke, opacity, box-shadow, transform;
              transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
              transition-duration: 100ms;
            }
          }
          &:hover .top-menu-side{
            color: var(--color-text);
            font-weight: var(--heading-weight);
            transition-property: background-color,
              border-color, color, fill, stroke, opacity, box-shadow, transform;
            transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
            transition-duration: 100ms;
          }
          &:hover .top-menu__icon:before {
            color: var(--color-text);
            background-color: var(--bg-panel);
          }
        }
      }
    }
  }
  .filter-bar {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
