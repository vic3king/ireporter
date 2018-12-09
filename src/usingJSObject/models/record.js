class IreporterRecord {
  /**
   * class constructor
    * @param {object} recordInfo
   */
  constructor() {
    this.records = [];
  }

  /**
   *
   * @returns {object} records object
   */
  createRecord(recordInfo) {
    const createRecord = {
      id: this.records.length + 1,
      message: 'Created red-flag record',
      title: recordInfo.title,
      description: recordInfo.description,
      createdOn: new Date(),
      createdBy: this.records.length + 1,
      type: recordInfo.type,
      location: recordInfo.location || '',
      status: 'draft',
      Images: [],
      Videos: [],
      comment: recordInfo.comment,
    };
    this.records.push(createRecord);
    return createRecord;
  }

  /**
   * @returns {object} returns all records
   */
  findAllRecords() {
    return this.records;
  }


  /**
   * @param {uuid} id
   * @returns {object} returns a record
   */
  findById(id) {
    // eslint-disable-next-line radix
    return this.records.find(record => record.id === parseInt(id));
  }

  /**
   *
   * @param {uuid} id
   * @param {object} userInfo
   */
  updateRecord(id, userInfo) {
    const record = this.findById(id);
    const index = this.records.indexOf(record);
    this.records[index].message = 'Updated red-flag record\'s location';
    this.records[index].location = userInfo.location;
    this.records[index].comment = userInfo.comment;
    this.records[index].modfiedOn = new Date();
    return this.records[index];
  }

  /**
   *
   * @param {uuid} id
   */
  deleteById(id) {
    const record = this.findById(id);
    const index = this.records.indexOf(record);
    this.records.splice(index, 1);
    return {
      status: 200,
      data: [{
        id,
        message: 'record has been deleted',
      }],
    };
  }
}
export default new IreporterRecord();
