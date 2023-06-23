import { createStore } from 'vuex'
import backend from "@/store/backend";
import profile from "@/store/profile"

export default createStore({
  modules: {
    backend: backend,
    profile: profile
  }
})
