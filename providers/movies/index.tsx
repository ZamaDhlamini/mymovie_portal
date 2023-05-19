import React, { FC, PropsWithChildren, useContext, useEffect, useReducer, useState } from 'react';
import { MovieReducer } from './reducer';
import {IMovie,INITIAL_STATE,MovieActionContext,MovieStateContext,} from './context';
import {GetMovieRequestAction} from './actions';
import { useGet } from 'restful-react';

const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);
    
    const { data ,refetch:getMoviesHttp} = useGet({
        path: 'Movie/GetAll' ,
        lazy: true,
    });
    
    useEffect(()=>{
        if(data){
            dispatch(GetMovieRequestAction(data.result));
        }
    },[data])
    
    const getMovies = async () => {
            getMoviesHttp();
    }

    return (
        <MovieStateContext.Provider value={state}>
            <MovieActionContext.Provider
                value={{
                    getMovies
                }}
            >
                {children}
            </MovieActionContext.Provider>
        </MovieStateContext.Provider>
    );
};

function useMovieState() {
    const context = useContext(MovieStateContext);
    if (!context) {
        throw new Error('useMovieState must be used within a MovieProvider');
    }
    return context;
}

function useMovieAction() {
    const context = useContext(MovieActionContext);
    if (context === undefined) {
        throw new Error('useMovieState must be used within a MovieProvider');
    }
    return context;
}

function useMovie() {
    return {
        ...useMovieState(),
        ...useMovieAction(),
    };
}
export { MovieProvider, useMovie };
    function createMovieRequestAction(result: any): import("redux-actions").Action<import("./context").IMovieStateContext> {
        throw new Error('Function not implemented.');
    }