const fs = require('fs');


function driver(num)
{
	if(num === 0)
	{
		fetch('https://api.openf1.org/v1/drivers?session_key=latest')
  		.then(response => response.json())
  		.then(jsonContent => {
			// console.log(jsonContent)
			fs.writeFile('./temp/driver.json', JSON.stringify(jsonContent), 'utf8', () => console.log('File written to ./temp/driver.json'));
			});
	}
	else
	{
		fetch('https://api.openf1.org/v1/drivers?session_key=latest&driver_number=' + num.toString())
  		.then(response => response.json())
  		.then(jsonContent => {
			if (jsonContent.length === 0)
			{
				console.log("Driver not found");
			}
			else
				console.log(jsonContent);
			});
	}
}

function position()
{
	fetch('https://api.openf1.org/v1/position?session_key=latest')
  	.then(response => response.json())
  	.then(jsonContent => console.log(jsonContent));

}


// 0 for all drivers, number of the driver to get driver data
console.log(driver(0));


// position();
