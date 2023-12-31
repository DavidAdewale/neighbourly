const dummyProperties = [
  {
    propertyType: 'residential',
    propertyCategory: 'house',
    propertyName: 'Cozy Cottage',
    address: '123 Main Street',
    city: 'Cityville',
    state: 'Stateville',
    postalCode: '12345',
    expectedRentalIncome: 2500,
    actualRentalIncome: 2500,
    occupancyStatus: 'occupied',
    amenities: ['Garage', 'Lawn', 'Swimming Pool'],
    tenantName: 'Sarah Johnson',
    tenantEmail: 'sarah.johnson@example.com',
    paymentStatus: 'paid',
    leaseStartDate: new Date('2023-07-01').toISOString(),
    leaseExpiryDate: new Date('2024-06-30').toISOString(),
    propertyImage: [
      'https://wbpnxdfjceyxeopmzsgy.supabase.co/storage/v1/object/public/property-images/house1.jpeg',
      'https://wbpnxdfjceyxeopmzsgy.supabase.co/storage/v1/object/public/property-images/house2.jpeg',
      'https://wbpnxdfjceyxeopmzsgy.supabase.co/storage/v1/object/public/property-images/house3.webp',
      'https://wbpnxdfjceyxeopmzsgy.supabase.co/storage/v1/object/public/property-images/house4.webp',
    ],
  },
  {
    propertyType: 'residential',
    propertyCategory: 'apartment-building',
    propertyName: 'Modern Apartments',
    address: '456 Park Avenue',
    city: 'Townsville',
    state: 'Stateville',
    postalCode: '54321',
    expectedRentalIncome: 5000,
    actualRentalIncome: 4800,
    occupancyStatus: 'partially-occupied',
    amenities: ['Gym', 'Pool'],
    tenantName: '',
    tenantEmail: '',
    paymentStatus: '',
    leaseStartDate: null,
    leaseExpiryDate: null,
    propertyImage: [
      'https://wbpnxdfjceyxeopmzsgy.supabase.co/storage/v1/object/public/property-images/apartment1.jpeg',
      'https://wbpnxdfjceyxeopmzsgy.supabase.co/storage/v1/object/public/property-images/apartment2.jpeg',
      'https://wbpnxdfjceyxeopmzsgy.supabase.co/storage/v1/object/public/property-images/apartment3.jpeg',
      'https://wbpnxdfjceyxeopmzsgy.supabase.co/storage/v1/object/public/property-images/apartment4.jpeg',
    ],
    propertyDetails: {
      totalApartments: 10,
      apartments: [
        {
          apartmentNumber: 'A1',
          occupancyStatus: 'occupied',
          tenantName: 'John Doe',
          tenantEmail: 'john.doe@example.com',
          paymentStatus: 'paid',
          leaseStartDate: new Date('2023-07-01').toISOString(),
          leaseEndDate: new Date('2024-06-30').toISOString(),
          expectedRentalIncome: 1800,
          actualRentalIncome: 1800,
          extraAmenities: ['Spacious Balcony', 'In-Unit Laundry'],
        },
        {
          apartmentNumber: 'A2',
          occupancyStatus: 'vacant',
          expectedRentalIncome: 1600,
          extraAmenities: ['Private Patio'],
        },
        {
          apartmentNumber: 'A3',
          occupancyStatus: 'occupied',
          tenantName: 'Jane Doe',
          tenantEmail: 'jane.doe@example.com',
          paymentStatus: 'paid',
          leaseStartDate: new Date('2023-07-01').toISOString(),
          leaseEndDate: new Date('2024-06-30').toISOString(),
          expectedRentalIncome: 1600,
          actualRentalIncome: 1600,
          extraAmenities: ['Balcony'],
        },
        {
          apartmentNumber: 'A4',
          occupancyStatus: 'vacant',
          expectedRentalIncome: 1700,
          extraAmenities: ['Garden View'],
        },
        {
          apartmentNumber: 'A5',
          occupancyStatus: 'occupied',
          tenantName: 'Michael Smith',
          tenantEmail: 'michael.smith@example.com',
          paymentStatus: 'paid',
          leaseStartDate: new Date('2023-07-01').toISOString(),
          leaseEndDate: new Date('2024-06-30').toISOString(),
          expectedRentalIncome: 2000,
          actualRentalIncome: 2000,
          extraAmenities: ['Swimming Pool', 'Fitness Center'],
        },
        {
          apartmentNumber: 'A6',
          occupancyStatus: 'vacant',
          expectedRentalIncome: 1500,
          extraAmenities: ['City View'],
        },
        {
          apartmentNumber: 'A7',
          occupancyStatus: 'occupied',
          tenantName: 'Emily Johnson',
          tenantEmail: 'emily.johnson@example.com',
          paymentStatus: 'paid',
          leaseStartDate: new Date('2023-07-01').toISOString(),
          leaseEndDate: new Date('2024-06-30').toISOString(),
          expectedRentalIncome: 1800,
          actualRentalIncome: 1800,
          extraAmenities: ['In-Unit Laundry'],
        },
        {
          apartmentNumber: 'A8',
          occupancyStatus: 'vacant',
          expectedRentalIncome: 1400,
          extraAmenities: ['Private Balcony'],
        },
        {
          apartmentNumber: 'A9',
          occupancyStatus: 'occupied',
          tenantName: 'Robert Brown',
          tenantEmail: 'robert.brown@example.com',
          paymentStatus: 'paid',
          leaseStartDate: new Date('2023-07-01').toISOString(),
          leaseEndDate: new Date('2024-06-30').toISOString(),
          expectedRentalIncome: 1700,
          actualRentalIncome: 1700,
          extraAmenities: ['Fitness Center', 'Swimming Pool'],
        },
        {
          apartmentNumber: 'A10',
          occupancyStatus: 'vacant',
          expectedRentalIncome: 1900,
          extraAmenities: ['City View', 'In-Unit Laundry'],
        },
      ],
    },
  },
];

export default dummyProperties;
