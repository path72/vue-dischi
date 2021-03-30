// ###################################################### 
// # Vue.js - MAIN INSTANCE                             # 
// ###################################################### 

var app = new Vue(
	{
		el: '#app',
		data: {
			itemList: [],
			itemListIsEmpty: true
		},
		methods: {
			getRemoteData() {
				axios
					.get(' https://flynn.boolean.careers/exercises/api/array/music')
					.then((resp)=>{
						this.itemList = resp.data.response;
						if (this.itemList.length > 0) this.itemListIsEmpty = false;
						console.log(this.itemList);
					});
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


