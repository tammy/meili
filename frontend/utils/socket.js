import Vue from 'vue';

export function getTripSocket() {
	return (new Vue()).$socket;
}
