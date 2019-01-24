FactoryBot.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/スクリーンショット 2018-08-20 16.02.21.png")
    user
    group
  end
end