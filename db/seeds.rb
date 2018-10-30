# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

customer1 = Customer.create(first_name: 'Jay', last_name: 'Ward', phone_number: '7745558872', email: "j@gmail.com", address: "1 Freedom Street", city: 'New Bedford', state: 'MA', zip_code: '02745')
customer2 = Customer.create(first_name: 'Maria', last_name: 'Braga', phone_number: '7745558872', email: "j@gmail.com", address: "1 Freedom Street", city: 'Fairhaven', state: 'MA', zip_code: '02745')
customer3 = Customer.create(first_name: 'John', last_name: 'Dowd', phone_number: '774.555.8872', email: "j@gmail.com", address: "1 Freedom Street", city: 'Boston', state: 'MA', zip_code: '02745')
