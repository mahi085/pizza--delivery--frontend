// Import puppeteer
import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false, slowMo: 250,defaultViewport: { width: 1600, height:710 },args:["--window-size=1920,1080"] });

  // Create a page
  
  const page = await browser.newPage();
  // Go to your site
  await page.goto('https://pizzabhandar.netlify.app/');
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  // Click the button
  const login_button = await page.$('a[href="/login"]');
  //console.log(login_button);
  await login_button.click();
  await new Promise(resolve => setTimeout(resolve, 2000));
  // enter email and password
  await page.type('#email', 'vermarajan5032@gmail.com');
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.type('#password', 'rajan123');
  await new Promise(resolve => setTimeout(resolve, 2000));
// After filling the fields, you can submit the form
await page.click('button[type="submit"]');
await new Promise(resolve => setTimeout(resolve, 2000));
// click button on order now
await page.click('a[href="/menu"]');


await new Promise(resolve => setTimeout(resolve, 10000));
// add item on cart
// addtocart

//await page.click(`button[type="addtocart"]:nth-child(${2})`);


// add all pizza
const containers = await page.$$('div.bg-orange-100');
let count=0;
for (const [index, container] of containers.entries()) {
  
  count=count+1;
  if(count%2==1){
    const button = await container.$('button[type="addtocart"]');
    if (button) {
        console.log(`Clicking button inside container ${index + 1}`);
        await button.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.log(`No button found inside container ${index + 1}`);
    }
  }
  
}
// go to cart
const your_cart_button= await page.$('.bg-orange-500');
await your_cart_button.click();

await new Promise(resolve => setTimeout(resolve, 2000));
//click on checkout
const model = await page.$('div.bg-white');
const checkout_button = await model.$('button[type="checkout"]');
 await checkout_button.click();

// fill shiping details
//await fillInputById(page, 'phoneNumber', '1234567890');
await page.type('#phoneNumber', '1234567890');
await new Promise(resolve => setTimeout(resolve, 500));
await page.type('#address', 'Uttar Pradesh');
await new Promise(resolve => setTimeout(resolve, 500));
await page.type('#city', 'Lucknow');
await new Promise(resolve => setTimeout(resolve, 500));
await page.type('#postalCode', '222222');
await new Promise(resolve => setTimeout(resolve, 500));
await page.type('#country', 'India');
await new Promise(resolve => setTimeout(resolve, 500));

// click on continue
await page.click('button[type="submit"]');
await new Promise(resolve => setTimeout(resolve, 500));
// cash on delivery
await page.click('input[type="radio"]');
await new Promise(resolve => setTimeout(resolve, 500));
await page.click('button[type="submit"]');
await new Promise(resolve => setTimeout(resolve, 1000));
// place order

await page.click('button[type="place-order"]');

await new Promise(resolve => setTimeout(resolve, 4000));

 // go to home
 const home_button = await page.$('a[href="/"]');
 await home_button.click();

 // go to about
 const about_button = await page.$('a[href="/about"]');
 await about_button.click();

 await new Promise(resolve => setTimeout(resolve, 1000));

 // go to profile
 await page.click('button[type="button"]');
 await new Promise(resolve => setTimeout(resolve, 2000));
const profile_button = await page.$('a[href="/profile"]');
await profile_button.click();

await new Promise(resolve => setTimeout(resolve, 2000));

// logout
await page.click('button[type="button"]');
await new Promise(resolve => setTimeout(resolve, 2000));
await page.click('button[type="logout-button"]');

await new Promise(resolve => setTimeout(resolve, 3000));

  // Close browser.
  await browser.close();
})();