const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/admin/auth.routes');
const leadAdminRoutes = require('./routes/admin/lead.routes');
const contactRoutes = require('./routes/public/contact.routes');
const portfolioRoutes = require('./routes/admin/portfolio.routes');
const proofRoutes = require('./routes/admin/proof.routes');
const blogAdminRoutes = require('./routes/admin/blog.routes');
const blogPublicRoutes = require('./routes/public/blog.routes');
const uploadRoutes = require('./routes/admin/upload.routes');
const subscribeRoutes = require('./routes/public/subscribe.routes');
const emailRoutes = require('./routes/admin/email.routes');
const incomeRoutes = require("./routes/admin/income.routes");
const subscriberRoutes = require("./routes/admin/subscriber.routes");
const portfolioAdminRoutes = require("./routes/admin/portfolio.routes");
const portfolioPublicRoutes = require("./routes/public/portfolio.routes");
const serviceRoutes = require("./routes/public/service.routes");
const serviceInterestRoutes = require("./routes/admin/serviceInterest.routes");



















const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/leads', leadAdminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/portfolio', portfolioRoutes);
app.use('/api/admin/proofs', proofRoutes);
app.use('/api/admin/blogs', blogAdminRoutes);
app.use('/api/blogs', blogPublicRoutes);
app.use('/api/admin/upload', uploadRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/admin/email', emailRoutes);
app.use("/api/admin/income", incomeRoutes);
app.use("/api/admin/subscribers", subscriberRoutes);



app.use("/api/admin/portfolio", portfolioAdminRoutes);
app.use("/api/portfolio", portfolioPublicRoutes);
app.use("/api/service-request", serviceRoutes);
app.use("/api/admin/services", serviceInterestRoutes);




app.get('/', (req, res) => {
  res.send('Digital A-Game API running');
});

module.exports = app;
