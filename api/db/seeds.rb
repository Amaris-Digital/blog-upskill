puts "💀 seeding 💀"

User.create!(
  [
    { name: "tosh", email: "tosh@gmail.com", password: "123456" },
    { name: "kev", email: "kev@gmail.com", password: "123456" }
  ]
)

# other users
10.times do |n|
  User.create!(
    name: Faker::Name.unique.name,
    email: "tosh#{n + 1}@gmail.com",
    password: "123456"
  )
end

# select users to create post for
users = User.all.take(6)

# create categories
category_names = %w[programming wellness drugs testing]
categories = category_names.map { |category| Category.create!(name: category) }

# cerate post
20.times do
  title = Faker::Lorem.sentence(word_count: 5)
  content = Faker::Lorem.paragraph(sentence_count: 10)
  category = categories.sample
  users.each do |user|
    user.posts.create!(title: title, content: content, category: category)
  end
end

#  create tags
tags = %w[ruby rails javascript react tailwind]
tags.each { |tag| Tag.create!(name: tag) }

# give post the tags
Post.all.each do |post|
  # no to determine how many tags per post randomly
  num_tags = rand(1..3)

  # select tags to asscociate with post
  post_tags = Tag.all.sample(num_tags)

  # associate tag with posts
  post.tags << post_tags
end

#  create comments
posts = Post.all.take(6)

posts.each do |post|
  5.times do
    post.comments.create!(
      body: Faker::Lorem.paragraph(sentence_count: 3),
      user: User.all.sample
    )
  end
end



puts "💀 done seeding 💀"
