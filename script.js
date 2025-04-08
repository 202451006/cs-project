const destinations = {
  rajasthan: {
    name: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    activities: ['Visit Amber Fort', 'Desert Safari in Jaisalmer', 'City Palace Tour', 'Lake Pichola Boat Ride'],
    hotels: ['Heritage Palace Hotel', 'Desert Luxury Camp', 'Royal Haveli Resort'],
    dailyCost: 5000
  },
  kerala: {
    name: 'Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    activities: ['Backwater Cruise', 'Ayurvedic Spa', 'Tea Plantation Visit', 'Beach Day at Varkala'],
    hotels: ['Backwater Resort', 'Treehouse Villa', 'Beach Resort'],
    dailyCost: 4000
  },
  goa: {
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
    activities: ['Beach Hopping', 'Old Goa Churches', 'Spice Plantation', 'Water Sports'],
    hotels: ['Beachfront Resort', 'Boutique Villa', 'Luxury Hotel'],
    dailyCost: 3500
  },
  himachal: {
    name: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
    activities: ['Trekking', 'Paragliding', 'Temple Visit', 'Mall Road Shopping'],
    hotels: ['Mountain View Resort', 'Luxury Cottage', 'Heritage Hotel'],
    dailyCost: 3000
  }
};

// Handle duration range input
const durationInput = document.querySelector('input[name="duration"]');
const durationValue = document.querySelector('.duration-value');

durationInput.addEventListener('input', (e) => {
  durationValue.textContent = `${e.target.value} days`;
});

// Handle form submission
const travelForm = document.getElementById('travelForm');
const travelPlan = document.getElementById('travelPlan');

travelForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(travelForm);
  const data = {
    destination: formData.get('destination'),
    travelers: parseInt(formData.get('travelers')),
    budget: parseInt(formData.get('budget')),
    startDate: formData.get('startDate'),
    duration: parseInt(formData.get('duration'))
  };

  generateTravelPlan(data);
});

function generateTravelPlan(data) {
  const dest = destinations[data.destination];
  const totalCost = dest.dailyCost * data.travelers * data.duration;
  const isWithinBudget = totalCost <= data.budget;

  const planHTML = `
    <div class="destination-image">
      <img src="${dest.image}" alt="${dest.name}">
      <div class="overlay">
        <h2>${dest.name}</h2>
      </div>
    </div>

    <div class="plan-content">
      <div class="trip-stats">
        <div class="stat">
          <span>${data.duration} days</span>
        </div>
        <div class="stat">
          <span>${data.travelers} travelers</span>
        </div>
        <div class="stat">
          <span>Multiple locations</span>
        </div>
        <div class="stat">
          <span>₹${totalCost.toLocaleString()}</span>
        </div>
      </div>

      <div class="budget-status ${isWithinBudget ? 'within' : 'exceeded'}">
        ${isWithinBudget 
          ? '✓ This trip fits within your budget!'
          : `⚠ This trip exceeds your budget by ₹${(totalCost - data.budget).toLocaleString()}`}
      </div>

      <div class="section">
        <h3>Activities</h3>
        <div class="activities-grid">
          ${dest.activities.map(activity => `
            <div class="activity">
              <span class="dot"></span>
              ${activity}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section">
        <h3>Recommended Stays</h3>
        ${dest.hotels.map(hotel => `
          <div class="activity">
            <span class="dot"></span>
            ${hotel}
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h3>Transportation</h3>
        <p>Private car rental and transfers between locations included in the package.</p>
      </div>

      <button onclick="location.href='success.html'" class="book-btn">Book Now</button>

    </div>
  `;

  travelPlan.innerHTML = planHTML;
  travelPlan.classList.remove('hidden');
  travelPlan.scrollIntoView({ behavior: 'smooth' });

  // ✅ Book Now Button Functionality
  const bookBtn = document.querySelector('.book-btn');
  bookBtn.addEventListener('click', () => {
    alert('Your trip has been booked successfully! 🎉');
  });
}
