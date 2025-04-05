# Moving Out App

This is a [Next.js](https://nextjs.org/) app that uses the [Material-UI](https://mui.com/) components.

## Models

I am using mongodb as my db which is nosql. But still I am defining models so that I can use the db in a structured way.

-   `ListItem` model:

```ts
export interface ListItem {
	name: string;
	date: Date;
	description: string;
	amount: number;
    location: string;
	category: string;
	type: string;
	image: string;
	_id: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}
```
