import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-card rounded-2xl shadow-md p-4 md:p-5 lg:p-6 mb-6 md:mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Filter" size={20} className="text-primary" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Filter by Category
        </h3>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
            selectedCategory === 'all' ?'bg-primary text-primary-foreground shadow-md scale-105' :'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          All Activities
        </button>
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onSelectCategory(category?.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            <span className="text-xl md:text-2xl" role="img" aria-label={category?.name}>
              {category?.emoji}
            </span>
            <span className="hidden sm:inline">{category?.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;