module.exports = (data) => {
    let score = 0;
  
    if (data.budget === "400k-plus") score += 30;
    if (data.budget === "150k-400k") score += 20;
    if (data.budget === "50k-150k") score += 10;
  
    if (data.timeline === "urgent") score += 15;
  
    if (data.domain === "Yes") score += 5;
    if (data.hosting === "Yes") score += 5;
    if (data.contentReady === "Fully ready") score += 10;
  
    if (data.organizationType === "Corporate") score += 15;
  
    return score;
  };
  