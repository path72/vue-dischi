// ###################################################### 
// # Vue.js - MAIN INSTANCE                             # 
// ###################################################### 

var app = new Vue(
	{
		el: '#app',
		data: {
			// ** DATA IN ** //
			itemList: [],
			itemListIsEmpty: true,
			// ** DATA OUT ** //
			filterLists: {}, 		// oggetto di parametri 1 con liste di parametri 2
			filters: [], 			// lista di parametri 1
			filter1Selected: '', 	// parametro 1 selezionato
			filter2Selected: ''		// parametro 2 selezionato
		},
		methods: {
			getRemoteData() {
				axios
					.get('https://flynn.boolean.careers/exercises/api/array/music')
					.then((resp)=>{
						this.itemList = resp.data.response; // array = array
						if (this.itemList.length > 0) this.itemListIsEmpty = false;
						this.buildFilterList(this.itemList);
					});
				},
			buildFilterList(items) {
				items.forEach((el)=>{
					for (key in el) {
						if (this.filterLists[key] == undefined) {
							this.filterLists[key] = [];
							this.filters.push(key);
						}
						if (!this.filterLists[key].includes(el[key])) this.filterLists[key].push(el[key]);
					}
				});
				console.log(this.filterLists);
				console.log(this.filters);
			},
			filter1Selection() {
				console.log(this.filter1Selected);
				this.filter2Selected = '';
			},
			filter2Selection() {
				console.log(this.filter2Selected);
			},
			isViewable(item) {
				if (this.filter1Selected && this.filter2Selected)
					return (item[this.filter1Selected] == this.filter2Selected);
				else return true;
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

// ###################################################### 
// # jQuery - DYNAMICS                                  # 
// ###################################################### 

// $(function() {
// // ********************* doc ready start ***


// // *********************** doc ready end ***
// });

// ###################################################### 
// # FUNCTIONS                                          # 
// ###################################################### 


