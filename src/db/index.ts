import { nanoid } from 'nanoid';

export class User {
  id: string;
  name: string;
  reviews: Review[] = [];

  constructor(params: { name: string; id: string }) {
    this.name = params.name;
    this.id = params.id;
  }

  addReview(review: Review) {
    this.reviews.push(review);
  }
}

export class Review {
  id: string;
  author: User;
  description: string;

  constructor(params: { author: User, description: string; id: string }) {
    this.author = params.author;
    this.description = params.description;
    this.id = params.id;
  }
}

class DB {
  users: { [key: string]: User };
  reviews: { [key: string]: Review };

  constructor() {
    const userId = nanoid(10);
    this.users = {
      [userId]: new User({ name: "Bob", id: userId }),
    };
    this.reviews = {};
    this.addReview({
      description: "첫번째 리뷰",
      userId,
    });
  }

  addReview({ description, userId }: { description: string; userId: string }) {
    const user = this.getUser(userId);
    const reviewId = nanoid(10);
    const newReview = new Review({ author: user, description, id: reviewId });
    this.reviews[reviewId] = newReview;
    user.addReview(newReview);
  }

  getUser(id: string): User {
    return this.users[id];
  }

  getReview(id: string): Review {
    return this.reviews[id];
  }

  getReviews(userId: string) {
    return this.users[userId].reviews;
  }
}

const db = new DB();

export default db;
