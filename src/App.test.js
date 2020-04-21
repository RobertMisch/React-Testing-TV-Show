import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

jest.mock("./api/fetchShow")
const showData= {
    data:{
    id: 2993,
    url: 'http://www.tvmaze.com/shows/2993/stranger-things',
    name: 'Stranger Things',
    type: 'Scripted',
    language: 'English',
    genres: [
        'Drama',
        'Fantasy',
        'Science-Fiction'
    ],
    status: 'Running',
    runtime: 60,
    premiered: '2016-07-15',
    officialSite: 'https://www.netflix.com/title/80057281',
    schedule: {
        time: '',
        days: [
        'Thursday'
        ]
    },
    rating: {
        average: 8.7
    },
    weight: 98,
    network: null,
    webChannel: {
        id: 1,
        name: 'Netflix',
        country: null
    },
    externals: {
        tvrage: 48493,
        thetvdb: 305288,
        imdb: 'tt4574334'
    },
    image: {
        medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg',
        original: 'http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg'
    },
    summary: '<p>A love letter to the \'80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>',
    updated: 1586341552,
    _links: {
        self: {
        href: 'http://api.tvmaze.com/shows/2993'
        },
        previousepisode: {
        href: 'http://api.tvmaze.com/episodes/1576476'
        }
    },
    _embedded: {
        episodes: [
        {
            id: 553946,
            url: 'http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers',
            name: 'Chapter One: The Vanishing of Will Byers',
            season: 1,
            number: 1,
            airdate: '2016-07-15',
            airtime: '',
            airstamp: '2016-07-15T12:00:00+00:00',
            runtime: 60,
            image: {
            medium: 'http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg',
            original: 'http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg'
            },
            summary: '<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy\'s friends conduct their own search, and meet a mysterious girl in the forest.</p>',
            _links: {
            self: {
                href: 'http://api.tvmaze.com/episodes/553946'
            }
            }
        },
        {
            id: 578663,
            url: 'http://www.tvmaze.com/episodes/578663/stranger-things-1x02-chapter-two-the-weirdo-on-maple-street',
            name: 'Chapter Two: The Weirdo on Maple Street',
            season: 1,
            number: 2,
            airdate: '2016-07-15',
            airtime: '',
            airstamp: '2016-07-15T12:00:00+00:00',
            runtime: 60,
            image: {
            medium: 'http://static.tvmaze.com/uploads/images/medium_landscape/72/181376.jpg',
            original: 'http://static.tvmaze.com/uploads/images/original_untouched/72/181376.jpg'
            }
        }
        ]
    }
}
}
test('renders without errors', ()=>{
    mockFetchShow.mockResolvedValueOnce(showData)
    render(<App />);
})
test("renders Season when dropdown is clicked", async () => {
// mockFetchShow.mockResolvedValueOnce(showData);
// const { getByText, findByText, queryAllByTestId } = render(<App />);
// const dropDown = await findByText(/select a season/i);
// userEvent.click(dropDown); //we need to activate the drop down
// await waitFor(() => expect(getByText(/season /i)).toBeInTheDocument);

    mockFetchShow.mockResolvedValueOnce(showData) //this is where we bring the function in. will return the response

    //here we made it so it waits for app to render. but we wont do that in the actual example
	const {getByText, findByText, debug, getAllByText} = /*await*/ render(<App/>) 
	await waitFor(()=>{getByText(/select a season/i)})
	const dropDown = await findByText(/select a season/i);
	userEvent.click(dropDown/*getByText(/select a season/i)*/)// <-now you can put drop down here.
	expect(dropDown).toBeInDocument
	// debug()//, keep your debug at the bottom, because then you can see how far you got into the app and keep track of your progression

	expect(getAllByText(/season /i)).toHaveLength(1) //3 here is the number of seasons we have in our data

	expect(mockFetchShow).toBeCalledTimes(2)
}); 

test("renders episodes when season clicked", async () => {
    mockFetchShow.mockResolvedValueOnce(showData)
const {getByText, findByText, getAllByText} = /*await*/ render(<App/>)
await waitFor(()=>{getByText(/select a season/i)})
	const dropDown = await findByText(/select a season/i);
	userEvent.click(dropDown/*getByText(/select a season/i)*/)// <-now you can put drop down here.
    expect(dropDown).toBeInDocument
    const selectSeason= await findByText(/season 1/i)
    expect(selectSeason).toBeInDocument
    userEvent.click(selectSeason)
    const episode= await findByText(/chapter one/i)
    expect(episode).toBeInDocument
})