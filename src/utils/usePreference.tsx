import Preference from 'react-native-preference';

export const setPreference = (key: string, value: string, onValue?: (value: void) => void) => {
    Preference.setWhiteList([]);
    Preference.set(key, value).then(function(value) {
        if(onValue){
            onValue(value);
        }
    });
}

export const getPreference = (key: string) => {
    return Preference.get(key);
}

export const clearPreference = (key: string) => {
    Preference.setWhiteList([]);
    Preference.clear(key);
}