// ###################################################### 
// # Vue.js - MAIN INSTANCE                             # 
// ###################################################### 

var app = new Vue(
	{
		el: '#app',
		data: {
			// ** data in ** //
			itemList: [],
			itemListIsEmpty: true,
			// ** controllers ** //
			filterLists: {}, 		// oggetto con parametro1: [ valori di parametro2 ]
			filter1Selected: '',	// selezione parametro1 = valore di parametro1
			filter2Selected: ''		// selezione parametro2 = valore di parametro2
		},
		methods: {
			getRemoteData() {
				axios
					.get('https://flynn.boolean.careers/exercises/api/array/music')
					.then((resp)=>{
						this.itemList = resp.data.response;
						if (this.itemList.length > 0) this.itemListIsEmpty = false;
						this.buildFilterList(this.itemList);
					});
			},
			buildFilterList(items) {
				items.forEach((item)=>{
					for (key in item) { // ciclo sui valori di parametro1
						if (this.filterLists[key] == undefined)
							this.filterLists[key] = [];
						if (!this.filterLists[key].includes(item[key])) 
							 this.filterLists[key].push(item[key]); // valori di parametro2
					}
				});
				console.log(this.filterLists);
			},
			isViewable(item) {
				if (this.filter1Selected && this.filter2Selected)
					return (item[this.filter1Selected] == this.filter2Selected);
				else 
					return true;
			},
			cap(string) {
				return string[0].toUpperCase()+string.substring(1);
			}
		},
		computed: {
		},
		created() {
			this.getRemoteData(); // prima è meglio
		},
		mounted() {
		},
		updated() {
		}
	}
);
// Vue.config.devtools = true;


