console.log('this is the front script')


fetch('http://localhost:3000/weather?address=taroudant').then((response)=>{
	response.json().then((data)=>{
		if (data.error) {
			console.log(data.error)
		} else {
			console.log(data)
		}
	})
})