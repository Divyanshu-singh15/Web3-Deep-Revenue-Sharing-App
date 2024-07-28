<script>
  let message = "Deep Revenue Sharing";
</script>

<style>
  body {
      background-color: #ADD8E6; /* Lightish blue background color */
      margin: 0;
      font-family: Arial, sans-serif;
  }
  .top-bar {
      width: 100%;
      background-color: #1D4ED8;
      color: white;
      padding: 1rem;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
  }
  section {
      width: 100vw;
      height: calc(100vh - 3.5rem); /* Adjust for top bar height */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ADD8E6; /* Lightish blue background color */
      padding: 1rem;
      box-sizing: border-box;
  }
  .content {
      text-align: center;
      margin-bottom: 2rem;
  }
  .alert {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
      font-size: 1rem;
      color: #374151;
      background-color: #F3F4F6;
      border-radius: 9999px;
      cursor: pointer;
      transition: background-color 0.2s;
  }
  .alert:hover {
      background-color: #E5E7EB;
  }
  .alert span:first-child {
      background-color: #1D4ED8;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      margin-right: 0.5rem;
  }
  .heading {
      margin-bottom: 1rem;
      font-size: 2.5rem;
      font-weight: bold;
      color: #111827;
  }
  .sub-heading {
      font-size: 1.25rem;
      color: #6B7280;
  }
  .cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
  }
  .card {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      width: 100%;
      max-width: 300px;
      text-align: center;
  }
  .card h2 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
      color: #1D4ED8;
  }
  .card p {
      color: #374151;
  }
</style>

<div class="top-bar">
   Homepage 
</div>

<section>
  <div class="content">
      <div class="alert" role="alert">
          <span>Welcome to the</span>
          <span>{message}</span>
      </div>
      <h1 class="heading">Empowering Your Business with Deep Revenue Insights and Sharing</h1>
      <p style="border-left-color: black;" class="sub-heading">Track your sales effortlessly with our intuitive dashboard.</p>
  </div>
  <div class="cards">
      <div class="card">
          <h2>Sales Overview</h2>
          <p>Track your sales performance with detailed analytics and reports.</p>
      </div>
      <div class="card">
          <h2>Revenue Insights</h2>
          <p>Gain insights into your revenue streams and optimize your strategy.</p>
      </div>
      <div class="card">
          <h2>Customer Analytics</h2>
          <p>Understand your customers better with comprehensive analytics.</p>
      </div>
      <div class="card">
        <h2>Easy for Salespeople </h2>
        <p>Gain insights into your salespeople's performance.</p>
    </div>
  </div>
</section>
