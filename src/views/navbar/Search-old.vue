<template>
  <div id="morphsearch" class="morphsearch" v-bind:class="{'open': searchOpen}">
    <form class="morphsearch-form">
      <!-- <input class="morphsearch-input" type="search" v-model="searchString" @keyup="search(searchString)" @focus="openSearch" placeholder="Search for candidates and jobs"/> -->
      <input class="morphsearch-input secondary" type="search" v-model="searchString" @blur="closeSearch(200)" @keyup="search(searchString)" @focus="openSearch" placeholder="Search for candidates"/>
      <!-- <button class=""> -->
      <!-- <font-awesome-icon :icon="['fas', 'search']" size="2x" class="mr-3 morphsearch-submit" /> -->
      <!-- <font-awesome-icon :icon="['fas', 'search']" size="sm" class="mr-3 morphsearch-submit" /> -->
      <!-- </button> -->
    </form>
    <v-layout row wrap class="morphsearch-content">
      <v-flex xs12 class="pa-2">
        <a class="dummy-media-object" v-for="cand in results.candidates" :key="cand.id" @click="openCandidate(cand.id)">
          <div class="media">
            <div class="media-body">
              <h3>{{cand.display_name}}</h3>
              <small class="text-muted">{{cand.email}}</small>
            </div>
          </div>
        </a>
      </v-flex>
      <v-flex xs12 class="pa-2">

        <a class="dummy-media-object hover-link mt-5" v-show="results.candidates.length === 0" href="#/candidates">
          No candidates found. <br><small>(jump to candidates tab.)</small>
        </a>
      </v-flex>
      <v-layout v-show="results.candidates.length === 0" class="px-2">
        <v-flex>
          We can't seem to find any candidate that match your search for "{{searchString}}", If you want to carry on your search you can go to
          <a class="hover-link" href="#/candidates">
            list of all candidates.
          </a>
        </v-flex>
      </v-layout>
    </v-layout>

    <span class="morphsearch-close" @click="closeSearch"></span>
  </div><!-- /morphsearch -->
</template>

<script>

export default {
  name: 'search',
  components: {
  },
  data () {
    return {
      searchOpen: false,
      searchString: '',
      onFocusValues: false,
      timeout: null,
      results: {
        candidates: []
      }
    };
  },
  methods: {
    openCandidate (id) {
      this.searchString = '';
      const path = `/candidates/view/${id}`;
      this.$router.push(path);
      this.$router.go();
      // this.$store.dispatch('updateCandidate', id);
    },
    search (string) {
      clearTimeout(this.timeout);
      // Make a new timeout set to go off in 800ms
      this.timeout = setTimeout(() => {
        let tagString = '';
        if (this.$lodash.includes(string, '#')) {
          tagString = string.split('#')[1].split(' ')[0];
        }
        if ((string !== '#') || (tagString && tagString.length > 0)) {
          this.$http.post(`${process.env.API_URL}Candidate/List`, {
            search_by_tag: tagString ? [tagString.trim()] : undefined,
            raw_search_string: string && (!tagString || tagString.length < 1)
              ? [string.trim()] : undefined,
            page_limit: '5',
            page_offset: '1'
          }).then((response) => {
            if (response.data && response.data.message) {
              this.results.candidates = response.data.message.data;
            }
          }, (response) => {
            throw new Error(response);
          });
        }
      }, 500);
    },
    openSearch () {
      this.searchOpen = true;
      if (!this.onFocusValues) {
        this.search();
        this.onFocusValues = true;
      }
    },
    closeSearch (timeout) {
      setTimeout(() => {
        this.searchOpen = false;
      }, timeout);
    }
  }
};
</script>

<style lang="scss" scoped>

.morphsearch {
  width: 40%;
  min-height: 34px;
  border-radius: 3px;
  background: #f4f8f9;
  position: absolute;
  z-index: 10000;
  // top: 10px;
  // right: 10%;
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transition-property: min-height, width, top, right;
  transition-property: min-height, width, top, right;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
  transition-timing-function: cubic-bezier(0.7,0,0.3,1);
}

.morphsearch.open {
  width: 40%;
  min-height: 366px;
  // top: 10px;
  // right: 0px;
  box-shadow: 0px 1px 10px #000000;
  // right: 0px;
}

.morphsearch-form {
  // position: absolute;
  // top: -36px;
  width: 100%;
  height: 34px;
  margin: 0 auto;
  position: relative;
  // -webkit-transition-property: width, height, -webkit-transform;
  // transition-property: width, height, transform;
  // -webkit-transition-duration: 0.5s;
  // transition-duration: 0.5s;
  // -webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
  // transition-timing-function: cubic-bezier(0.7,0,0.3,1);
}

.morphsearch.open .morphsearch-form {
  // width: 80%;
  // height: 160px;
  position: absolute;
  top: -36px;
  -webkit-transform: translate3d(0,3em,0);
  transform: translate3d(0,3em,0);
}

.morphsearch-input {
  width: 100%;
  height: 100%;
  padding: 0 10% 0 10px;
  font-weight: 700;
  border: none;
  background: transparent;
  font-size: 13px;
  color: #0d2c8d;
  -webkit-transition: font-size 0.5s cubic-bezier(0.7,0,0.3,1);
  transition: font-size 0.5s cubic-bezier(0.7,0,0.3,1);
}

.morphsearch-input::-ms-clear { /* remove cross in IE */
    display: none;
}

.morphsearch.hideInput .morphsearch-input {
  color: transparent;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
}

/* placeholder */
.morphsearch-input::-webkit-input-placeholder {
  color: #a7a6a6;
  font-size: 13px;
}

.morphsearch-input:-moz-placeholder {
  color: #c2c2c2;
}

.morphsearch-input::-moz-placeholder {
  color: #c2c2c2;
}

.morphsearch-input:-ms-input-placeholder {
  color: #c2c2c2;
}

/* hide placeholder when active in Chrome */
.gn-search:focus::-webkit-input-placeholder {
  color: transparent;
}

input[type="search"] { /* reset normalize */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.morphsearch-input:focus,
.morphsearch-submit:focus {
  outline: none;
}

.morphsearch-submit {
  position: absolute;
  width: 30px;
  height: 30px;
  text-indent: 100px;
  overflow: hidden;
  right: 0;
  top: 70%;
  // background: transparent url(../img/magnifier.svg) no-repeat center center;
  background-size: 100%;
  border: none;
  pointer-events: none;
  transform-origin: 50% 50%;
  opacity: 0;
  -webkit-transform: translate3d(-30px,-50%,0) scale3d(0,0,1);
  transform: translate3d(-30px,-50%,0) scale3d(0,0,1);
}

.morphsearch.open .morphsearch-submit {
  pointer-events: auto;
  opacity: 1;
  color: #c2c2c2;
  -webkit-transform: translate3d(-30px,-50%,0) scale3d(1,1,1);
  transform: translate3d(-30px,-50%,0) scale3d(1,1,1);
  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s;
  -webkit-transition-delay: 0.5s;
  transition-delay: 0.5s;
}

.morphsearch-close {
  width: 20px;
  height: 20px;
  position: absolute;
  padding-left: 10px;
  right: 1em;
  top: .5em;
  overflow: hidden;
  text-indent: 100%;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  -webkit-transform: scale3d(0,0,1);
  transform: scale3d(0,0,1);
}

.morphsearch.open .morphsearch-close {
  opacity: 1;
  pointer-events: auto;
  -webkit-transform: scale3d(1,1,1);
  transform: scale3d(1,1,1);
  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s;
  -webkit-transition-delay: 0.5s;
  transition-delay: 0.5s;
}

.morphsearch-close::before,
.morphsearch-close::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 100%;
  top: 0;
  left: 50%;
  border-radius: 3px;
  opacity: 0.2;
  background: #000;
}

.morphsearch-close:hover.morphsearch-close::before,
.morphsearch-close:hover.morphsearch-close::after {
  opacity: 1;
}

.morphsearch-close::before {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.morphsearch-close::after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.morphsearch-content {
  color: #333;
  margin-top: 3em !important;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding: 0 0.5%;
  background: #f4f8f9;
  position: absolute;
  pointer-events: none;
  opacity: 0;
}

.morphsearch.open .morphsearch-content {
  opacity: 1;
  height: auto;
  overflow: visible; /* this breaks the transition of the children in FF: https://bugzilla.mozilla.org/show_bug.cgi?id=625289 */
  pointer-events: auto;
  -webkit-transition: opacity 0.3s 0.5s;
  transition: opacity 0.3s 0.5s;
}

.dummy-column {
  width: 30%;
  padding: 0 0 6em;
  float: left;
  opacity: 0;
  -webkit-transform: translate3d(0,100px,0);
  transform: translateY(100px);
  -webkit-transition: -webkit-transform 0.5s, opacity 0.5s;
  transition: transform 0.5s, opacity 0.5s;
}

.morphsearch.open .dummy-column:first-child {
  -webkit-transition-delay: 0.4s;
  transition-delay: 0.4s;
}

.morphsearch.open .dummy-column:nth-child(2) {
  -webkit-transition-delay: 0.45s;
  transition-delay: 0.45s;
}

.morphsearch.open .dummy-column:nth-child(3) {
  -webkit-transition-delay: 0.5s;
  transition-delay: 0.5s;
}

.morphsearch.open .dummy-column {
  opacity: 1;
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
}

.dummy-column:nth-child(2) {
  margin: 0 5%;
}

.dummy-column h2 {
  font-size: 1em;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 800;
  color: #c2c2c2;
  padding: 0.5em 0;
}

.round {
  border-radius: 50%;
}

.dummy-media-object {
  padding: 0.5em;
  display: block;
  margin: 0.3em 0;
  cursor: pointer;
  border-radius: 5px;
  background: rgba(118,117,128,0.05);
}

.dummy-media-object:hover,
.dummy-media-object:focus {
  background: rgba(118,117,128,0.1);
}

.dummy-media-object img {
  display: inline-block;
  width: 50px;
  margin: 0 10px 0 0;
  vertical-align: middle;
}

.dummy-media-object h3 {
  vertical-align: middle;
  font-size: 0.85em;
  display: inline-block;
  font-weight: 700;
  margin: 0 0 0 0;
  width: calc(100% - 40px);
  color: black;
}

.dummy-media-object:hover h3 {
  color: #0d2c8d;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  opacity: 0;
  pointer-events: none;
  -webkit-transition: opacity 0.5s;
  transition: opacity 0.5s;
  -webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
  transition-timing-function: cubic-bezier(0.7,0,0.3,1);
}

.morphsearch.open ~ .overlay {
  opacity: 1;
}

@media screen and (max-width: 53.125em) {
  .morphsearch-input {
    padding: 0 25% 0 10px;
  }
  .dummy-column {
    float: none;
    width: auto;
    padding: 0 0 2em;
  }
  .dummy-column:nth-child(2) {
    margin: 0;
  }
  .morphsearch.open .morphsearch-submit {
    -webkit-transform: translate3d(0,-50%,0) scale3d(0.5,0.5,1);
    transform: translate3d(0,-50%,0) scale3d(0.5,0.5,1);
  }
}

@media screen and (max-width: 577px) {
  .morphsearch {
    background: transparent;
    width: 50px;

    .morphsearch-input {
      display: none
    }

    .morphsearch-submit {
      height: 30px;
      width: 30px;
      top: 3px;
      opacity: 1;
      transform: none;
    }
  }

}
</style>
