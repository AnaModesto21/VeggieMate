class APIFeatures {
    constructor (query, queryStr ) {
                    this.query = query;
                    this.queryStr = queryStr;
    }
    
    
    search() {
                    const keyword = this.queryStr.keyword ? {

                        name: {
                            $regex: this.queryStr.keyword,
                            $options: 'i'
                            }
                    } : {}

                    this.query = this.query.find({ ...keyword });
                    return this;
    }

    filter() {

        const queryCopy = { ...this.queryStr };

        const removeFields = [ 'keyword' , 'limt', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        //remove 3 fields from query to search only by category


        //several filters - more specific

        let queryStr = JSON.stringify(queryCopy)
        //regex to apply filters for less than/less than equal/ greater than and greater than equal to
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures