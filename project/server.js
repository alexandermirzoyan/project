var express = require('express');
var app = express();

app.use(express.static('.'));
app.get('/', (req, res) => {
  res.redirect('index.html');
});

app.listen(3000, () => {
  console.log("Example is running on port 3000")
});