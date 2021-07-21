// ###################################################### 
// # Vue.js - MAIN INSTANCE                             # 
// ###################################################### 

var app = new Vue(
	{
		el: '#app',
		data: {
			itemList: [], 			// original remote data 
			displayItems: [],		// displayed (sortable) data
			displayItemsAreReady: false,
			sortSelected: '',		// parameter1 selected for sorting
			filterLists: {}, 		// object with parameter1: [ parameter2 value list ]
			filter1Selected: '', 	// parameter1 selected for filter
			filter2Selected: ''		// parameter2 selected for filter
		},
		methods: {
			getRemoteData() {
				axios
					.get('https://flynn.boolean.careers/exercises/api/array/music')
					.then((resp)=>{
						this.itemList = resp.data.response;	 // original data
						this.buildFilterList(this.itemList); // object of data's parameters
					});
			},
			buildFilterList(items) {
				items.forEach((item)=>{ // item cycle
					for (key in item) { // parameter1 cycle of item
						if (this.filterLists[key] == undefined)
							this.filterLists[key] = []; // parameter2 values list
						if (!this.filterLists[key].includes(item[key])) 
							 this.filterLists[key].push(item[key]); // parameter2 values
					}
				});
				// console.log(this.filterLists);
				this.displayItems = this.itemList; // filling displayed data
				if (this.displayItems.length > 0) this.displayItemsAreReady = true;
			},
			sortFilter() {
				if (this.sortSelected) {
					this.filterLists[this.sortSelected].sort(); // sorted parameter2 values
					// console.log(this.filterLists[this.sortSelected]);
					let sortedItems = []; // sorted items by sorted paramter2
					this.filterLists[this.sortSelected].forEach((sortPar)=>{
						this.itemList.forEach((item)=>{
							for (key in item) {
								if (item[key] == sortPar && !sortedItems.includes(item))
									sortedItems.push(item);
							}
						});
					});
					this.displayItems = sortedItems;
					// console.log(this.displayItems);
				} else {
					this.displayItems = this.itemList;
				}
			},
			isViewable(item) {
				if (this.filter1Selected && this.filter2Selected)
					return (item[this.filter1Selected] == this.filter2Selected);
				else 
					return true;
			},
			isSelected(par) {
				if (par == this.filter2Selected) return true;
				else return false;
			},
			isSorted(par) {
				if (par == this.sortSelected) return true;
				else return false;
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
