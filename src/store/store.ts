import AppStore from "./appStore";
import LocalStore from "./localStore";

interface Store
{
    appStore: AppStore,
    localStore: LocalStore
}

export const store: Store =
{
    appStore: new AppStore(),
    localStore: new LocalStore()
}